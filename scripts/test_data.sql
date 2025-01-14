-- Test data for integration tests
INSERT INTO stops (stop_id, stop_name, stop_lat, stop_lon) VALUES
('TEST001', 'Test Stop 1', 1.3521, 103.8198),
('TEST002', 'Test Stop 2', 1.3522, 103.8199);

INSERT INTO routes (route_id, route_short_name, route_long_name) VALUES
('ROUTE001', 'Test Route 1', 'Test Route Long Name 1'),
('ROUTE002', 'Test Route 2', 'Test Route Long Name 2');

INSERT INTO calendar (service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date) VALUES
('SERVICE001', 1, 1, 1, 1, 1, 0, 0, '20240101', '20241231');

-- Test data for historical delays
INSERT INTO historical_data (route_id, stop_id, arrival_time, bus_arrival_time, distance_to_stop, _id) VALUES
('ROUTE001', 'TEST001', '08:00:00', '08:05:00', 0.5, 'HIST001'),
('ROUTE001', 'TEST001', '08:30:00', '08:33:00', 0.3, 'HIST002');
