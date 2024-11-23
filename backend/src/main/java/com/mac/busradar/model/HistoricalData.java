package com.mac.busradar.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "historical_data")
public class HistoricalData {

    @Id
    @Column(name = "_id", nullable = false, length = 255)
    private String id;

    @Column(name = "route_id", length = 255)
    private String routeId;

    @Column(name = "stop_id", length = 255)
    private String stopId;

    @Column(name = "stop_lat")
    private Double stopLat;

    @Column(name = "stop_lon")
    private Double stopLon;

    @Column(name = "arrival_time", length = 8)
    private String arrivalTime;

    @Column(name = "bus_arrival_time", length = 8)
    private String busArrivalTime;

    @Column(name = "bus_lat")
    private Double busLat;

    @Column(name = "bus_lon")
    private Double busLon;

    @Column(name = "distance_to_stop")
    private Double distanceToStop;

    @Column(name = "day", length = 255)
    private String day;

    @Column(name = "rain_intensity")
    private Double rainIntensity;

    @Column(name = "snow_intensity")
    private Double snowIntensity;

    @Column(name = "temperature")
    private Double temperature;

    @Column(name = "wind_speed")
    private Double windSpeed;

    @Column(name = "_class", length = 255)
    private String className;
}