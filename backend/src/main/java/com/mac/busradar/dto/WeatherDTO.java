package com.mac.busradar.dto;

import lombok.Data;

@Data
public class WeatherDTO {

    private String id;
    private Timelines timelines;
    private Location location;

    @Data
    public static class Timelines {
        private Timeline[] minutely;
        private Timeline[] hourly;
        private Timeline[] daily;
    }

    @Data
    public static class Timeline {
        private String time;
        private WeatherValue values;
    }

    @Data
    private static class WeatherValue {
        private Double cloudBase;
        private Double cloudCeiling;
        private int cloudCover;
        private double dewPoint;
        private double evapotranspiration;
        private double freezingRainIntensity;
        private int humidity;
        private double iceAccumulation;
        private double iceAccumulationLwe;
        private int precipitationProbability;
        private double pressureSurfaceLevel;
        private double rainAccumulation;
        private double rainAccumulationLwe;
        private double rainIntensity;
        private double sleetAccumulation;
        private double sleetAccumulationLwe;
        private double sleetIntensity;
        private double snowAccumulation;
        private double snowAccumulationLwe;
        private double snowDepth;
        private double snowIntensity;
        private double temperature;
        private double temperatureApparent;
        private int uvHealthConcern;
        private int uvIndex;
        private double visibility;
        private int weatherCode;
        private double windDirection;
        private double windGust;
        private double windSpeed;
    }

    @Data
    private static class Location {
        private float lat;
        private float lon;
    }
}
