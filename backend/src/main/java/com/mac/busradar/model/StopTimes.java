package com.mac.busradar.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "stop_times")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StopTimes {
    @Id
    private String id;
    @Field("trip_id")
    private int tripId;

    @Field("arrival_time")
    private String arrivalTime;

    @Field("departure_time")
    private String departureTime;

    @Field("stop_id")
    private int stopID;

    @Field("stop_sequence")
    private int stopSequence;

    @Field("stop_headsign")
    private String stopHeadsign;

    @Field("pickup_type")
    private int pickupType;

    @Field("drop_off_type")
    private int dropOffType;
}
