package com.mac.busradar.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "trips")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Trip {
    @Id
    private String id;

    @Field("route_id")
    private int routeId;

    @Field("service_id")
    private int serviceId;

    @Field("trip_id")
    private int tripId;

    @Field("trip_headsign")
    private String tripHeadsign;

    @Field("trip_short_name")
    private String tripShortName;

    @Field("direction_id")
    private int directionId;

    @Field("block_id")
    private int blockId;

    @Field("shape_id")
    private int shapeId;

    @Field("wheelchair_accessible")
    private boolean wheelchairAccessible;

    @Field("bikes_allowed")
    private boolean bikesAllowed;
}
