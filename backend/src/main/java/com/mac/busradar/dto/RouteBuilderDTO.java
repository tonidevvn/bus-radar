package com.mac.busradar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RouteBuilderDTO {
    private boolean isDetour;
    private Point[] points;

    @Data
    private static class Point {
        private int patternID;
        private int pointSeqNo;
        private int stopID;
        private int stopNumber;
        private float latitude;
        private float longitude;
        private boolean isPublic;
    }
}
