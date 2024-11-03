package com.mac.busradar.repository;

import com.mac.busradar.model.Trips;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trips, String> {
    List<Trips> findAllByShapeIdIn(List<Integer> blockIds);
}
