package com.mac.busradar.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TimeUtils {
    public static String getCurrentTime(int plusMinutes) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        if (plusMinutes > 0) {
            currentDateTime = currentDateTime.plusMinutes(plusMinutes);
        } else if (plusMinutes < 0) {
            currentDateTime = currentDateTime.minusMinutes(-plusMinutes);
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        return currentDateTime.format(formatter);
    }
}
