package com.mac.busradar.repository;

import com.mac.busradar.model.Trip;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends MongoRepository<Trip, String> {
    Trip findByShapeId(String tripId);
}
