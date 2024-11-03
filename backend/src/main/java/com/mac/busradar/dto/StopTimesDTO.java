package com.mac.busradar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StopTimesDTO {
    private String id;
    private int tripID;
    private int stopID;
    private String arrivalTime;
    private String departureTime;
}
