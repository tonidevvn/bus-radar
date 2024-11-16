package com.mac.busradar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stop_times")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StopTimes {

    @EmbeddedId
    private StopTimesId id;

    @Column(name = "arrival_time")
    private String arrivalTime;

    @Column(name = "departure_time")
    private String departureTime;

    @Column(name = "stop_headsign")
    private String stopHeadsign;

    @Column(name = "pickup_type")
    private int pickupType;

    @Column(name = "drop_off_type")
    private int dropOffType;

    @ManyToOne
    @JoinColumn(name = "trip_id", insertable = false, updatable = false)
    private Trips trip;

    @ManyToOne
    @JoinColumn(name = "stop_id", insertable = false, updatable = false)
    private Stop stop;
}
