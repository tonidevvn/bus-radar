package com.mac.busradar.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
class PredictionDTO {
    private String predictTime;
    private String scheduleTime;
    private String predictionType;
    private int seqNo;
}
