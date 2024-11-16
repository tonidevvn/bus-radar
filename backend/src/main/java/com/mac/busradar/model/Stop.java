package com.mac.busradar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "stops")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Stop {

    @Id
    @Column(name = "stop_id", length = 255)
    private String stopId;

    @Column(name = "stop_code", length = 255)
    private String stopCode;

    @Column(name = "stop_name", length = 255)
    private String stopName;

    @Column(name = "stop_desc", length = 255)
    private String stopDesc;

    @Column(name = "stop_lat")
    private double stopLat;

    @Column(name = "stop_lon")
    private double stopLon;

    @Column(name = "zone_id", length = 255)
    private String zoneId;

    @Column(name = "stop_url", length = 255)
    private String stopUrl;

    @Column(name = "location_type")
    private int locationType;

    @Column(name = "parent_station", length = 255)
    private String parentStation;

    @Column(name = "wheelchair_boarding")
    private boolean wheelchairBoarding;


}
