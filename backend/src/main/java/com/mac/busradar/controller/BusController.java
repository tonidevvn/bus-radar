package com.mac.busradar.controller;

import com.mac.busradar.dto.RouteDTO;
import com.mac.busradar.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
}
