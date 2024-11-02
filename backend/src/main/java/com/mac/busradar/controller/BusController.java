package com.mac.busradar.controller;

import com.mac.busradar.dto.*;
import com.mac.busradar.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BusController {
    @Autowired
    private BusService busService;

    @GetMapping("routes")
    public Mono<ResponseEntity<List<RouteDTO>>> getRoutes() {
        return busService.getRoutes()
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("routesBuilder")
    public Mono<ResponseEntity<List<RouteBuilderDTO>>> getRoutesBuilder(@RequestParam String patternIds) {
        return busService.getRoutesBuilder(patternIds)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("stops")
    public Mono<ResponseEntity<List<StopDTO>>> getStops(@RequestParam String patternIds) {
        return busService.getStops(patternIds)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("vehicleStatus")
    public Mono<ResponseEntity<List<VehicleStatusDTO>>> getVehicleStatus(@RequestParam String patternIds) {
        return busService.getVehicleStatus(patternIds)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("predictionData")
    public Mono<ResponseEntity<StopScheduleDTO>> getPredictionData(@RequestParam String stopId) {
        return busService.getPredictionData(stopId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
