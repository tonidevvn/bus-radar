package com.mac.busradar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StopDelayDTO {
    private String stopId;
    private Double averageDelay;;
}
