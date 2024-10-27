package com.mac.busradar.service;

import com.mac.busradar.dto.RouteDTO;
import com.mac.busradar.dto.WeatherDTO;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;

@Service
public class WeatherService {
    private final WebClient webClient;

    @Value("${weather.api.key}")
    private String API_KEY;

    public WeatherService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.tomorrow.io").build();
    }

    public Mono<WeatherDTO.Timeline[]> getWeather(String lat, String lon, String timeline) {
        WeatherDTO weatherDTO = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v4/weather/forecast")
                        .queryParam("apikey", API_KEY)
                        .queryParam("location", lat + "," + lon).build())
                .retrieve()
                .bodyToMono(WeatherDTO.class)
                .block();

        if (Objects.equals(timeline, "minutely")) {
            assert weatherDTO != null;
            return Mono.just(weatherDTO.getTimelines().getMinutely());
        }
        if (Objects.equals(timeline, "hourly")) {
            assert weatherDTO != null;
            return Mono.just(weatherDTO.getTimelines().getHourly());
        }
        if (Objects.equals(timeline, "daily")) {
            assert weatherDTO != null;
            return Mono.just(weatherDTO.getTimelines().getDaily());
        }
        return null;
    }
}

