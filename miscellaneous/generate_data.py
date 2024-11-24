import math
import random

import pandas as pd
from pymongo import MongoClient

# Write to mongodb

# Read the CSV file
df = pd.read_csv("schedule.csv")

# route_id             2612
# stop_id            107093
# arrival_time     05:15:00
# stop_lat        42.246094
# stop_lon       -83.017841
# monday                  1
# tuesday                 0
# wednesday               0
# thursday                0
# friday                  0
# saturday                0
# sunday                  0


def haversine(lat1, lon1, lat2, lon2):
    # Convert latitude and longitude from degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.asin(math.sqrt(a))

    # Radius of Earth in meters. Use 3956 for miles. Determines return value units.
    r = 6371000
    return c * r


generated_data = []
for index, row in df.iterrows():
    data = row.to_dict()
    new_data = {}

    # Copy route_id, stop_id, stop_lat, stop_lon
    new_data["route_id"] = data["route_id"]
    new_data["stop_id"] = data["stop_code"]
    new_data["stop_lat"] = data["stop_lat"]
    new_data["stop_lon"] = data["stop_lon"]
    new_data["arrival_time"] = data["arrival_time"]

    # Random bus_arrival_time from arrival_time but difference between [-2, 2] minutes
    bus_arrival_time = data["arrival_time"]
    bus_arrival_time = bus_arrival_time.split(":")
    bus_arrival_time = [int(x) for x in bus_arrival_time]

    # Generate a random float offset between -2 and 2 minutes
    offset = random.uniform(-2, 2)
    bus_arrival_time[1] += offset

    # Adjust hours and minutes if necessary
    if bus_arrival_time[1] < 0:
        bus_arrival_time[1] += 60
        bus_arrival_time[0] -= 1
    elif bus_arrival_time[1] >= 60:
        bus_arrival_time[1] -= 60
        bus_arrival_time[0] += 1

    bus_arrival_time = f"{bus_arrival_time[0]:02d}:{int(bus_arrival_time[1]):02d}:{int((bus_arrival_time[1] % 1) * 60):02d}"
    new_data["bus_arrival_time"] = bus_arrival_time

    # Generate random bus_lat, bus_lon from stop_lat, stop_lon but difference between [-0.001, 0.001]
    bus_lat = data["stop_lat"]
    bus_lon = data["stop_lon"]
    bus_lat += random.uniform(-0.0001, 0.0001)
    bus_lon += random.uniform(-0.0001, 0.0001)
    new_data["bus_lat"] = bus_lat
    new_data["bus_lon"] = bus_lon

    # Calculate the distance between the bus and the stop
    distance = haversine(data["stop_lat"], data["stop_lon"], bus_lat, bus_lon)
    new_data["distance_to_stop"] = distance

    # Get day of the week
    days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ]
    for day in days:
        if data[day] == 1:
            new_data["day"] = day
            break

    # Generate rain intensity, snow intensity, temperature, and wind speed
    new_data["rain_intensity"] = random.uniform(0, 1)
    new_data["snow_intensity"] = random.uniform(0, 0.1)
    new_data["temperature"] = random.uniform(0, 10)
    new_data["wind_speed"] = random.uniform(0, 100)

    new_data["_class"] = "com.mac.busradar.model.HistoricalArrival"

    # Collect batches and write to mongodb in batches
    generated_data.append(new_data)

client = MongoClient(
    "mongodb+srv://ngph:ngph@test-cluster.hbobrkl.mongodb.net/bus_radar?retryWrites=true&w=majority&appName=test-cluster"
)

db = client["bus_radar"]

collection = db["historical_data"]

collection.insert_many(generated_data)

# Save csv
df = pd.DataFrame(generated_data)

df.to_csv("historical_data.csv", index=False)
