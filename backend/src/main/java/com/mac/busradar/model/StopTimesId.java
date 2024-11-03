package com.mac.busradar.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class StopTimesId implements Serializable {

    @Column(name = "trip_id")
    private int tripId;

    @Column(name = "stop_id")
    private int stopId;

    @Column(name = "stop_sequence")
    private int stopSequence;
}
