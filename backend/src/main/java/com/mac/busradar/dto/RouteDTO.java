package com.mac.busradar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
@AllArgsConstructor
public class RouteDTO implements Serializable {
    private int routeID;
    private int routeNumber;
    private String routeCode;
    private String routeName;
    private String color;
    private String headSign;
    private int patternID;
    private String patternCode;
    private String patternName;
    private int patternNumber;
    private int directionID;
    private String directionName;
    private int serviceID;
    private String serviceName;
    private String arrivalTimes;
}
