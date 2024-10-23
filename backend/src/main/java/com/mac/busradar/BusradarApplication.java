package com.mac.busradar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class BusradarApplication {

	public static void main(String[] args) {
		SpringApplication.run(BusradarApplication.class, args);
	}

}
