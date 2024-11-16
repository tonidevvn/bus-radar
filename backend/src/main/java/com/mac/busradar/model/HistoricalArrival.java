package com.mac.busradar.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("historical_arrival")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HistoricalArrival {
    private Long routeId;
    private String stopCode;
    private Double stopLat;
    private Double stopLon;
    private String arrivalTime;
    private String departureTime;
    private float busLat;
    private float busLon;
    private int velocity;
    private String name;
    private int patternId;
    public String vehicleCapacityIndicator;
    private double distance;
    private String busArrivalTime;
    private String dayOfWeek;
}
