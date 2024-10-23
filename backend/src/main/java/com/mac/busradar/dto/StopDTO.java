package com.mac.busradar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StopDTO {
    public int stopID;
    public int stopNumber;
    public int seq;
    public int patternID;
    public String stopCode;
    public String stopName;
    public float latitude;
    public float longitude;
    public boolean isPublic;
    public boolean isActive;
}
