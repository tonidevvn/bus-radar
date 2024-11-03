package com.mac.busradar.service;

import com.mac.busradar.dto.*;
import com.mac.busradar.model.Stop;
import com.mac.busradar.model.StopTimes;
import com.mac.busradar.model.Vehicle;
import com.mac.busradar.repository.StopRepository;
import com.mac.busradar.repository.StopTimesRepository;
import com.mac.busradar.repository.VehicleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;

@Service
public class BusService {
    public final WebClient webClient;
    private final StopRepository stopRepository;
    private final VehicleRepository vehicleRepository;
    private final StopTimesRepository stopTimesRepository;
    private final ModelMapper modelMapper;

    public BusService(WebClient.Builder webClientBuilder, StopRepository stopRepository, VehicleRepository vehicleRepository, StopTimesRepository stopTimesRepository, ModelMapper modelMapper) {
        this.webClient = webClientBuilder.baseUrl("https://windsor.mytransitride.com").build();
        this.stopRepository = stopRepository;
        this.vehicleRepository = vehicleRepository;
        this.stopTimesRepository = stopTimesRepository;
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
        List<Stop> stops = Objects.requireNonNull(stopsData.block()).stream().map(stopDTO -> modelMapper.map(stopDTO, Stop.class)).toList();
        stopRepository.saveAll(stops);
        return stopsData;
    }

    public List<StopTimesDTO> getStopTimes(String stopId) {
        List<StopTimes> stopTimes = stopTimesRepository.findAllByStopIDOrderByDepartureTimeAsc(Integer.parseInt(stopId));
        return stopTimes.stream().map(st -> modelMapper.map(st, StopTimesDTO.class)).toList();
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
        vehicleRepository.saveAll(vehicles);
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
