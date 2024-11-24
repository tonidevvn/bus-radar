import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error
import joblib

# Load data
df = pd.read_csv("./historical_data.csv")

# Drop unnecessary columns
df = df.drop(columns=["_id", "_class"], errors="ignore")

# Encode categorical features
label_encoders = {}
categorical_columns = ["route_id", "stop_id", "day"]

for col in categorical_columns:
    label_encoders[col] = LabelEncoder()
    df[col] = label_encoders[col].fit_transform(df[col])

# Calculate target as difference between bus_arrival_time and arrival_time
df["bus_arrival_minutes"] = df["bus_arrival_time"].apply(
    lambda x: int(x[:2]) * 60 + int(x[3:5])
)
df["arrival_minutes"] = df["arrival_time"].apply(
    lambda x: int(x[:2]) * 60 + int(x[3:5])
)
df["arrival_delay"] = df["bus_arrival_minutes"] - df["arrival_minutes"]

# Define features and target
X = df.drop(
    columns=[
        "stop_lat",
        "stop_lon",
        "bus_lat",
        "bus_lon",
        "bus_arrival_time",
        "arrival_time",
        "bus_arrival_minutes",
        "arrival_minutes",
        "arrival_delay",
    ]
)
y = df["arrival_delay"]

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Gradient Boosting model
gbm = GradientBoostingRegressor()
gbm.fit(X_train, y_train)

# Save the model and encoders for later inference
joblib.dump(gbm, "gradient_boosting_model.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")

# Predict and evaluate
predictions = gbm.predict(X_test)
mse = mean_squared_error(y_test, predictions)
print(f"Mean Squared Error: {mse}")
