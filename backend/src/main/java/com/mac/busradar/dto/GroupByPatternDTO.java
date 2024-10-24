package com.mac.busradar.dto;


import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
class GroupByPatternDTO {
    private int directId;
    private String directName;
    private int patternId;
    private int routeNum;
    private String routeName;
    private String routeCode;
    private String patternName;
    private List<PredictionDTO> predictions;
    private String ptrnStart;
}