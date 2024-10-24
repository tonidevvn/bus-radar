package com.mac.busradar.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class StopScheduleDTO {
    private String stopCode;
    private Boolean failed;
    private String reqTime;
    private String stopName;
    private List<GroupByPatternDTO> grpByPtrn;
}