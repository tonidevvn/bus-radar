package com.mac.busradar.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class WeatherRealtimeDTO implements Serializable {
    private WeatherRealtimeData data;
    private WeatherRealtimeLocation location;

    @Data
    public static class WeatherRealtimeData implements Serializable {
        private String time;
        private WeatherRealtimeInner values;
    }

    @Data
    public static class WeatherRealtimeInner implements Serializable {
        private Double cloudBase;
        private Double cloudCeiling;
        private Integer cloudCover;
        private Double dewPoint;
        private Integer freezingRainIntensity;
        private Integer humidity;
        private Integer precipitationProbability;
        private Double pressureSurfaceLevel;
        private Double rainIntensity;
        private Integer sleetIntensity;
        private Integer snowIntensity;
        private Double temperature;
        private Double temperatureApparent;
        private Integer uvHealthConcern;
        private Integer uvIndex;
        private Double visibility;
        private Integer weatherCode;
        private Double windDirection;
        private Double windGust;
        private Double windSpeed;
    }

    @Data
    public static class WeatherRealtimeLocation implements Serializable {
        private float lat;
        private float lon;
    }
}


