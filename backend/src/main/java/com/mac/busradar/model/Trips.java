package com.mac.busradar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "trips")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Trips {

    @Id
    @Column(name = "trip_id")
    private int tripId;

    @Column(name = "route_id")
    private int routeId;

    @Column(name = "service_id")
    private int serviceId;

    @Column(name = "trip_headsign")
    private String tripHeadsign;

    @Column(name = "trip_short_name")
    private String tripShortName;

    @Column(name = "direction_id")
    private int directionId;

    @Column(name = "block_id")
    private int blockId;

    @Column(name = "shape_id")
    private int shapeId;

    @Column(name = "wheelchair_accessible")
    private int wheelchairAccessible;

    @Column(name = "bikes_allowed")
    private int bikesAllowed;

    @ManyToOne
    @JoinColumn(name = "service_id", insertable = false, updatable = false)
    private Calendar calendar;
}
