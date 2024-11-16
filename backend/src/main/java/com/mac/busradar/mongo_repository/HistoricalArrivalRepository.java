package com.mac.busradar.mongo_repository;

import com.mac.busradar.model.HistoricalArrival;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricalArrivalRepository extends MongoRepository<HistoricalArrival, String> {
}
