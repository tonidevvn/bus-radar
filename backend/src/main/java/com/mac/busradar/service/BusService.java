package com.mac.busradar.service;

import com.mac.busradar.dto.RouteDTO;
import com.mac.busradar.dto.StopDTO;
import com.mac.busradar.dto.StopScheduleDTO;
import com.mac.busradar.dto.VehicleStatusDTO;
import com.mac.busradar.model.Stop;
import com.mac.busradar.model.Vehicle;
import com.mac.busradar.repository.StopRepository;
import com.mac.busradar.repository.VehicleRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
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
    private final ModelMapper modelMapper;

    public BusService(WebClient.Builder webClientBuilder, StopRepository stopRepository, VehicleRepository vehicleRepository, ModelMapper modelMapper) {
        this.webClient = webClientBuilder.baseUrl("https://windsor.mytransitride.com").build();
        this.stopRepository = stopRepository;
        this.vehicleRepository = vehicleRepository;
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

    public Mono<List<StopDTO>> getStops(String patternIds) {
        Mono<List<StopDTO>> stopsData =  webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/Stop")
                        .queryParam("patternIds", patternIds)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<StopDTO>>() {});
        List<Stop> stops = Objects.requireNonNull(stopsData.block()).stream().map(stopDTO -> modelMapper.map(stopDTO, Stop.class)).toList();
        stopRepository.saveAll(stops);
        return stopsData;
    }

    public Mono<List<VehicleStatusDTO>> getVehicleStatus(String patternIds) {
        Mono<List<VehicleStatusDTO>> vehicleData = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/VehicleStatuses")
                        .queryParam("patternIds", patternIds)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<VehicleStatusDTO>>() {});
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
