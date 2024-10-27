package com.mac.busradar.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "stop")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Stop {
    @Id
    private String id;
    public int stopID;
    public int stopNumber;
    public int seq;
    public int patternID;
    public String stopCode;
    public String stopName;
    public float latitude;
    public float longitude;
    public boolean isPublic;
    public boolean isActive;
}
