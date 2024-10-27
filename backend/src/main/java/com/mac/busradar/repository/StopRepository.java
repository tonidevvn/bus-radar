package com.mac.busradar.repository;

import com.mac.busradar.model.Stop;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StopRepository extends MongoRepository<Stop, String> {
}
