import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.preprocessing import LabelEncoder
import datetime


def is_valid_time(time_str):
    try:
        # Parse time; if it's invalid, it will throw an error
        return time_str <= "23:59:59"
    except ValueError:
        # Exclude invalid time formats
        return False


df = pd.read_csv("./historical_data.csv")

# Step 2: Feature Engineering
# Encode categorical features
le = LabelEncoder()
df["day_encoded"] = le.fit_transform(df["day"])

df = df[df["arrival_time"].apply(is_valid_time)]
df = df[df["bus_arrival_time"].apply(is_valid_time)]

# Convert arrival_time to seconds from midnight
df["arrival_seconds"] = df["arrival_time"].apply(
    lambda x: int(
        datetime.datetime.strptime(x, "%H:%M:%S").time().hour * 3600
        + datetime.datetime.strptime(x, "%H:%M:%S").time().minute * 60
    )
)

df["bus_arrival_seconds"] = df["bus_arrival_time"].apply(
    lambda x: int(
        datetime.datetime.strptime(x, "%H:%M:%S").time().hour * 3600
        + datetime.datetime.strptime(x, "%H:%M:%S").time().minute * 60
    )
)


# Define the target variable
df["delay"] = df["bus_arrival_seconds"] - df["arrival_seconds"]

# Step 3: Train-Test Split
X = df[
    [
        "route_id",
        "stop_id",
        "rain_intensity",
        "snow_intensity",
        "temperature",
        "wind_speed",
        "day_encoded",
    ]
]
y = df["delay"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Step 4: Train Model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Step 5: Evaluate Model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print("Mean Absolute Error:", mae)
print("Root Mean Squared Error:", rmse)
