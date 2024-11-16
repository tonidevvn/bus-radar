package com.mac.busradar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HistoricalArrivalDTO {
    private String stopCode;
    private Double stopLat;
    private Double stopLon;
    private String arrivalTime;
    private String departureTime;
    private String busArrivalTime;

    public HistoricalArrivalDTO(String stopCode, Double stopLat, Double stopLon, String arrivalTime, String departureTime) {
        this.stopCode = stopCode;
        this.stopLat = stopLat;
        this.stopLon = stopLon;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
    }
}

