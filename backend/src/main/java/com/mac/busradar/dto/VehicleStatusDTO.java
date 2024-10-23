package com.mac.busradar.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VehicleStatusDTO {
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
    public int bearing;
    public int vehicleStateId;
    public String bypassDailyTripId;
}
