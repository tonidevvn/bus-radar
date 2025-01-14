package com.mac.busradar.model;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

class StopTest {

    @Test
    void stopConstructorAndGettersSetters() {
        // Arrange
        Stop stop = new Stop();
        
        // Act
        stop.setStopId("1234");
        stop.setStopName("Test Stop");
        stop.setStopLat(1.3521);
        stop.setStopLon(103.8198);
        
        // Assert
        assertThat(stop.getStopId()).isEqualTo("1234");
        assertThat(stop.getStopName()).isEqualTo("Test Stop");
        assertThat(stop.getStopLat()).isEqualTo(1.3521);
        assertThat(stop.getStopLon()).isEqualTo(103.8198);
    }
}
