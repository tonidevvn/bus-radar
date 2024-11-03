package com.mac.busradar.repository;

import com.mac.busradar.dto.StopSDTO;
import com.mac.busradar.model.StopTimes;
import com.mac.busradar.model.StopTimesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StopTimesRepository extends JpaRepository<StopTimes, StopTimesId> {

    @Query("SELECT new com.mac.busradar.dto.StopSDTO(st.arrivalTime, st.departureTime) " +
            "FROM StopTimes st " +
            "JOIN st.trip t " +
            "JOIN t.calendar c " +
            "WHERE st.id.stopId = :stopId " +
            "AND t.routeId = :routeId " +
            "AND (" +
            "   (:dayOfWeek = 'monday' AND c.monday = true) OR " +
            "   (:dayOfWeek = 'tuesday' AND c.tuesday = true) OR " +
            "   (:dayOfWeek = 'wednesday' AND c.wednesday = true) OR " +
            "   (:dayOfWeek = 'thursday' AND c.thursday = true) OR " +
            "   (:dayOfWeek = 'friday' AND c.friday = true) OR " +
            "   (:dayOfWeek = 'saturday' AND c.saturday = true) OR " +
            "   (:dayOfWeek = 'sunday' AND c.sunday = true) " +
            ") " +
            "ORDER BY st.arrivalTime")
    List<StopSDTO> findScheduleForDay(@Param("stopId") Long stopId,
                                      @Param("routeId") Long routeId,
                                      @Param("dayOfWeek") String dayOfWeek);
}
