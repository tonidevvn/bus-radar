package com.mac.busradar.controller;

import com.mac.busradar.dto.RouteDTO;
import com.mac.busradar.dto.StopDTO;
import com.mac.busradar.dto.StopScheduleDTO;
import com.mac.busradar.dto.VehicleStatusDTO;
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
