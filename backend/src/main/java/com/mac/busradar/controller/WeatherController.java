package com.mac.busradar.controller;

import com.mac.busradar.dto.WeatherDTO;
import com.mac.busradar.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class WeatherController {
    @Autowired
    public WeatherService weatherService;

    @GetMapping("weather")
    public Mono<ResponseEntity<WeatherDTO.Timeline[]>> getWeather(@RequestParam String lat,
                                                                 @RequestParam String lng,
                                                                 @RequestParam String timeline) {
        return weatherService.getWeather(lat, lng, timeline)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
