import requests
import pymongo
import schedule
import time
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# MongoDB and API Configuration
MONGO_URL = os.getenv("MONGO_URL")
API_KEY = os.getenv("API_KEY")
DATABASE_NAME = "bus_radar"
COLLECTION_NAME = "weather"

# MongoDB connection
client = pymongo.MongoClient(MONGO_URL)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

# Tomorrow.io API configuration
API_URL = "http://api.tomorrow.io/v4/weather/forecast"
LOCATION = "windsor"
TIMESTEPS = "hourly"

def fetch_and_store_weather():
    """Fetch weather data from the API and store it in MongoDB."""
    try:
        # Make the API call
        params = {
            "location": LOCATION,
            "timesteps": TIMESTEPS,
            "apikey": API_KEY
        }
        response = requests.get(API_URL, params=params)
        response.raise_for_status()  # Raise an error for bad status codes
        data = response.json()

        # Add a timestamp to the document
        data["fetched_at"] = datetime.utcnow()

        # Insert the data into MongoDB
        collection.insert_one(data)

        print(f"Weather data successfully stored at {datetime.utcnow()}")

    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
    except pymongo.errors.PyMongoError as e:
        print(f"MongoDB error: {e}")

def cleanup_old_weather_data():
    """Remove weather data older than 7 days."""
    try:
        # Calculate the cutoff date
        cutoff_date = datetime.utcnow() - timedelta(days=7)

        # Delete documents older than the cutoff date
        result = collection.delete_many({"fetched_at": {"$lt": cutoff_date}})
        print(f"Deleted {result.deleted_count} outdated weather records.")
    except pymongo.errors.PyMongoError as e:
        print(f"MongoDB cleanup error: {e}")

# Schedule the weather fetch job every 30 minutes
schedule.every(30).minutes.do(fetch_and_store_weather)

# Schedule the cleanup job to run at the end of each day
schedule.every().day.at("23:59").do(cleanup_old_weather_data)

if __name__ == "__main__":
    print("Starting weather data fetcher...")
    fetch_and_store_weather()  # Run once immediately
    while True:
        schedule.run_pending()
        time.sleep(1)
