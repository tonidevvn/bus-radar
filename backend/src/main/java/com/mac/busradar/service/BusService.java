package com.mac.busradar.service;

import com.mac.busradar.dto.RouteDTO;
import com.mac.busradar.dto.StopDTO;
import com.mac.busradar.dto.VehicleStatusDTO;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class BusService {
    public final WebClient webClient;

    public BusService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://windsor.mytransitride.com").build();
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
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/Stop")
                        .queryParam("patternIds", patternIds)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<StopDTO>>() {});
    }

    public Mono<List<VehicleStatusDTO>> getVehicleStatus(String patternIds) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/VehicleStatuses")
                        .queryParam("patternIds", patternIds)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<VehicleStatusDTO>>() {});
    }
}
