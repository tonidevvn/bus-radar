package com.mac.busradar.service;

import com.mac.busradar.dto.*;
import com.mac.busradar.model.HistoricalArrival;
import com.mac.busradar.model.Vehicle;
import com.mac.busradar.mongo_repository.HistoricalArrivalRepository;
import com.mac.busradar.repository.StopRepository;
import com.mac.busradar.repository.StopTimesRepository;
import com.mac.busradar.repository.TripRepository;
import com.mac.busradar.mongo_repository.VehicleRepository;
import com.mac.busradar.util.MathUtils;
import com.mac.busradar.util.TimeUtils;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class BusService {
    public final WebClient webClient;
    private final VehicleRepository vehicleRepository;
    private final HistoricalArrivalRepository historicalArrivalRepository;
    private final StopTimesRepository stopTimesRepository;
    private final TripRepository tripRepository;
    private final ModelMapper modelMapper;
    private double minDistance = 10;

    public BusService(WebClient.Builder webClientBuilder, StopRepository stopRepository, VehicleRepository vehicleRepository, HistoricalArrivalRepository historicalArrivalRepository, StopTimesRepository stopTimesRepository, TripRepository tripRepository, ModelMapper modelMapper) {
        this.webClient = webClientBuilder.baseUrl("https://windsor.mytransitride.com").build();
        this.vehicleRepository = vehicleRepository;
        this.historicalArrivalRepository = historicalArrivalRepository;
        this.stopTimesRepository = stopTimesRepository;
        this.tripRepository = tripRepository;
        this.modelMapper = modelMapper;
    }

    @Cacheable("routes")
    public Mono<List<RouteDTO>> getRoutes() {
        return webClient.get()
                .uri("/api/Route")
                .retrieve()
                .bodyToFlux(RouteDTO.class)
                .collectList();

    }

    public Mono<List<RouteBuilderDTO>> getRoutesBuilder(String patternIds) {
        Mono<List<RouteBuilderDTO>> routesBuilderData = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/RouteBuilder")
                        .queryParam("patternIds", patternIds)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {
                });
        return routesBuilderData;
    }

    public Mono<List<StopDTO>> getStops(String patternIds) {
        Mono<List<StopDTO>> stopsData =  webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/Stop")
                        .queryParam("patternIds", patternIds)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {
                });
        return stopsData;
    }

    public List<StopSDTO> getStopTimes(String routeId, String stopId, String dayOfWeek) {
        return stopTimesRepository.findScheduleForDay(Long.parseLong(stopId), Long.parseLong(routeId), dayOfWeek);
    }

    public Mono<List<VehicleStatusDTO>> getVehicleStatus(String patternIds) {
        Mono<List<VehicleStatusDTO>> vehicleData = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/VehicleStatuses")
                        .queryParam("patternIds", patternIds)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {
                });
        List<Vehicle> vehicles = Objects.requireNonNull(vehicleData.block()).stream().map(vehicleStatusDTO -> modelMapper.map(vehicleStatusDTO, Vehicle.class)).toList();

        // When vehicle reaches nearest bus stop, record the time
        String startTime = TimeUtils.getCurrentTime(-5);
        String endTime = TimeUtils.getCurrentTime(5);
        Long routeID = 18L;
        String dayOfWeek = "saturday";
        List<HistoricalArrivalDTO> dtos = stopTimesRepository.findSchedule(routeID, startTime, endTime, dayOfWeek);

        // Calculate haversine distance
        List<HistoricalArrival> historicalArrivals = new ArrayList<>();
        for (HistoricalArrivalDTO dto : dtos) {
            for (Vehicle vehicle : vehicles) {
                double distance = MathUtils.haversine(vehicle.lat, vehicle.lng, dto.getStopLat(), dto.getStopLon());
                if (distance < minDistance) {
                    HistoricalArrival historicalArrival = new HistoricalArrival(
                            routeID,
                            dto.getStopCode(),
                            dto.getStopLat(),
                            dto.getStopLon(),
                            dto.getArrivalTime(),
                            dto.getDepartureTime(),
                            vehicle.getLat(),
                            vehicle.getLng(),
                            vehicle.getVelocity(),
                            vehicle.getName(),
                            vehicle.getPatternId(),
                            vehicle.getVehicleCapacityIndicator(),
                            distance,
                            TimeUtils.getCurrentTime(0),
                            dayOfWeek
                    );
                    historicalArrivals.add(historicalArrival);
                    break;
                }
            }
        }
        if (!historicalArrivals.isEmpty()) {
            historicalArrivalRepository.saveAll(historicalArrivals);
        }
        return vehicleData;
    }

    public Mono<StopScheduleDTO> getPredictionData(String stopId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/PredictionData")
                        .queryParam("stopId", stopId)
                        .build())
                .retrieve()
                .bodyToMono(StopScheduleDTO.class);
    }
}
