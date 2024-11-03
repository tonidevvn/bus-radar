package com.mac.busradar.repository;

import com.mac.busradar.model.StopTimes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StopTimesRepository extends MongoRepository<StopTimes, String> {
    List<StopTimes> findAllByStopIDOrderByDepartureTimeAsc(int stop_id);
}
