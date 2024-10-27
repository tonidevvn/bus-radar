package com.mac.busradar.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document("vehicle")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Vehicle {
    @Id
    private String id;
    public int patternId;
    public String name;
    public String iconUrl;
    public String vehicleCapacityIndicator;
    public boolean isLight;
    public boolean isMedium;
    public boolean isFull;
    public String headsignText;
    public int vehicleId;
    public String lastUpdate;
    public float lat;
    public float lng;
    public int velocity;
    public int vehicleStateId;
    public int bearing;
    public String bypassDailyTripId;
}
