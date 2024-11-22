package com.mac.busradar.service;

import com.mac.busradar.cache.RedisService;
import com.mac.busradar.dto.RouteDTO;
import com.mac.busradar.dto.WeatherDTO;
import com.mac.busradar.dto.WeatherRealtimeDTO;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
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

    public WeatherService(WebClient.Builder webClientBuilder, RedisService redisService) {
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

    @Cacheable(value = "weather-realtime-cache", key = "#lat + '-' + #lon")
    @CacheEvict(value = "weather-realtime-cache", key = "#lat + '-' + #lon", allEntries = false, beforeInvocation = false)
    public WeatherRealtimeDTO getRealtime(Double lat, Double lon) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v4/weather/realtime")
                        .queryParam("apikey", API_KEY)
                        .queryParam("location", lat + "," + lon).build())
                .retrieve()
                .bodyToMono(WeatherRealtimeDTO.class)
                .block();
    }
}

