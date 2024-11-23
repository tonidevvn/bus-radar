package com.mac.busradar.repository;

import com.mac.busradar.dto.StopDelayDTO;
import com.mac.busradar.model.HistoricalData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HistoricalDataRepository extends JpaRepository<HistoricalData, String> {
    @Query(value = "SELECT stop_id AS stopId, AVG(TIME_TO_SEC(TIMEDIFF(STR_TO_DATE(bus_arrival_time, '%H:%i:%s'), STR_TO_DATE(arrival_time, '%H:%i:%s')))) AS averageDelay " +
            "FROM historical_data " +
            "WHERE stop_id IN :stopNumbers " +
            "GROUP BY stop_id",
            nativeQuery = true)
    List<Object[]> findAverageDelayByStopNumbers(@Param("stopNumbers") List<String> stopNumbers);

}
