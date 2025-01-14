package com.mac.busradar.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

class WeatherRealtimeDTOTest {

    @Test
    void weatherDataMapping() {
        // Arrange
        WeatherRealtimeDTO dto = new WeatherRealtimeDTO();
        WeatherRealtimeDTO.WeatherRealtimeData data = new WeatherRealtimeDTO.WeatherRealtimeData();
        WeatherRealtimeDTO.WeatherRealtimeInner values = new WeatherRealtimeDTO.WeatherRealtimeInner();
        
        // Act
        values.setTemperature(25.5);
        values.setRainIntensity(0.0);
        values.setWindSpeed(10.0);
        data.setValues(values);
        dto.setData(data);
        
        // Assert
        assertThat(dto.getData().getValues().getTemperature()).isEqualTo(25.5);
        assertThat(dto.getData().getValues().getRainIntensity()).isEqualTo(0.0);
        assertThat(dto.getData().getValues().getWindSpeed()).isEqualTo(10.0);
    }
}
