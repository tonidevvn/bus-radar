package com.mac.busradar.controller;

import com.mac.busradar.dto.*;
import com.mac.busradar.service.BusService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@WebFluxTest(BusController.class)
class BusControllerTest {

    @Autowired
    private WebTestClient webClient;

    @MockBean
    private BusService busService;

    @Test
    void getStopTimes_ShouldReturnStopTimes() {
        // Arrange
        StopSDTO stopTime = new StopSDTO();
        List<StopSDTO> stopTimes = Arrays.asList(stopTime);
        when(busService.getStopTimes(anyString(), anyString(), anyString()))
            .thenReturn(stopTimes);

        // Act & Assert
        webClient.get()
            .uri("/api/stopTimes?routeID=1&stopID=2&dayOfWeek=MONDAY")
            .exchange()
            .expectStatus().isOk()
            .expectBodyList(StopSDTO.class);
    }

    @Test
    void getPredictionData_ShouldReturnPredictions() {
        // Arrange
        StopScheduleDTO schedule = new StopScheduleDTO();
        when(busService.getPredictionData(anyString()))
            .thenReturn(Mono.just(schedule));

        // Act & Assert
        webClient.get()
            .uri("/api/predictionData?stopId=1234")
            .exchange()
            .expectStatus().isOk()
            .expectBody(StopScheduleDTO.class);
    }
}
