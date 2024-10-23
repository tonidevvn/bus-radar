package com.mac.busradar.service;

import com.mac.busradar.dto.RouteDTO;
import org.springframework.cache.annotation.Cacheable;
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
}
