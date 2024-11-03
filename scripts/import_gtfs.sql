-- Create table for agency data
CREATE TABLE agency (
    agency_id VARCHAR(255),
    agency_name VARCHAR(255),
    agency_url VARCHAR(255),
    agency_timezone VARCHAR(255),
    agency_lang VARCHAR(255),
    agency_phone VARCHAR(255),
    agency_fare_url VARCHAR(255),
    PRIMARY KEY (agency_id)
);

LOAD DATA INFILE '/var/lib/mysql-files/agency.txt'
INTO TABLE agency
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Create table for routes data
CREATE TABLE routes (
    route_id VARCHAR(255),
    agency_id VARCHAR(255),
    route_short_name VARCHAR(255),
    route_long_name VARCHAR(255),
    route_desc VARCHAR(255),
    route_type INT,
    route_url VARCHAR(255),
    route_color VARCHAR(255),
    route_text_color VARCHAR(255),
    PRIMARY KEY (route_id),
    FOREIGN KEY (agency_id) REFERENCES agency(agency_id)
);

LOAD DATA INFILE '/var/lib/mysql-files/routes.txt'
INTO TABLE routes
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Create table for stops data
CREATE TABLE stops (
    stop_id VARCHAR(255),
    stop_code VARCHAR(255),
    stop_name VARCHAR(255),
    stop_desc VARCHAR(255),
    stop_lat DOUBLE,
    stop_lon DOUBLE,
    zone_id VARCHAR(255),
    stop_url VARCHAR(255),
    location_type INT,
    parent_station VARCHAR(255),
    wheelchair_boarding TINYINT,
    PRIMARY KEY (stop_id)
);

LOAD DATA INFILE '/var/lib/mysql-files/stops.txt'
INTO TABLE stops
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Create table for trips data
CREATE TABLE trips (
    route_id VARCHAR(255),
    service_id VARCHAR(255),
    trip_id VARCHAR(255),
    trip_headsign VARCHAR(255),
    trip_short_name VARCHAR(255),
    direction_id INT,
    block_id VARCHAR(255),
    shape_id VARCHAR(255),
    wheelchair_accessible TINYINT,
    bikes_allowed TINYINT,
    PRIMARY KEY (trip_id),
    FOREIGN KEY (route_id) REFERENCES routes(route_id)
);

LOAD DATA INFILE '/var/lib/mysql-files/trips.txt'
INTO TABLE trips
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Create table for stop_times data
CREATE TABLE stop_times (
    trip_id VARCHAR(255),
    arrival_time VARCHAR(8),
    departure_time VARCHAR(8),
    stop_id VARCHAR(255),
    stop_sequence INT,
    stop_headsign VARCHAR(255),
    pickup_type TINYINT,
    drop_off_type TINYINT,
    PRIMARY KEY (trip_id, stop_id, stop_sequence),
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id),
    FOREIGN KEY (stop_id) REFERENCES stops(stop_id)
);

LOAD DATA INFILE '/var/lib/mysql-files/stop_times.txt'
INTO TABLE stop_times
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Create table for calendar data
CREATE TABLE calendar (
    service_id VARCHAR(255),
    monday TINYINT,
    tuesday TINYINT,
    wednesday TINYINT,
    thursday TINYINT,
    friday TINYINT,
    saturday TINYINT,
    sunday TINYINT,
    start_date VARCHAR(8),
    end_date VARCHAR(8),
    PRIMARY KEY (service_id)
);

LOAD DATA INFILE '/var/lib/mysql-files/calendar.txt'
INTO TABLE calendar
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Create table for calendar_dates data
CREATE TABLE calendar_dates (
    service_id VARCHAR(255),
    date VARCHAR(8),
    exception_type TINYINT,
    PRIMARY KEY (service_id, date)
);

LOAD DATA INFILE '/var/lib/mysql-files/calendar_dates.txt'
INTO TABLE calendar_dates
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Create table for shapes data
CREATE TABLE shapes (
    shape_id VARCHAR(255),
    shape_pt_lat DOUBLE,
    shape_pt_lon DOUBLE,
    shape_pt_sequence INT,
    PRIMARY KEY (shape_id, shape_pt_sequence)
);

LOAD DATA INFILE '/var/lib/mysql-files/shapes.txt'
INTO TABLE shapes
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
