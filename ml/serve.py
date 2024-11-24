import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn


# Function to load and preprocess data
def load_and_preprocess_data(file_path):
    # Load data
    df = pd.read_csv(file_path)

    # Drop unnecessary columns
    df = df.drop(
        columns=["_id", "_class", "day", "route_id", "stop_id", "distance_to_stop"],
        errors="ignore",
    )

    # Calculate target as difference between bus_arrival_time and arrival_time
    df["bus_arrival_minutes"] = df["bus_arrival_time"].apply(
        lambda x: int(x[:2]) * 60 + int(x[3:5])
    )
    df["arrival_minutes"] = df["arrival_time"].apply(
        lambda x: int(x[:2]) * 60 + int(x[3:5])
    )
    df["arrival_delay"] = df["bus_arrival_minutes"] - df["arrival_minutes"]

    return df


# Function to define features and target
def define_features_and_target(df):
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
    return X, y


# Function to train the model
def train_model(X, y):
    # Split the data into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Train Gradient Boosting model
    gbm = GradientBoostingRegressor()
    gbm.fit(X_train, y_train)

    # Predict and evaluate
    predictions = gbm.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    print(f"Mean Squared Error: {mse}")
    return gbm


# FastAPI app to serve the model
app = FastAPI()

# Train the model
df = load_and_preprocess_data("./historical_data.csv")
X, y = define_features_and_target(df)
gbm = train_model(X, y)


# Request model for prediction
class PredictionRequest(BaseModel):
    rain_intensity: float
    snow_intensity: float
    temperature: float
    wind_speed: float


@app.post("/predict")
async def predict_delay(request: PredictionRequest):
    try:
        # Prepare data for prediction
        data = request.dict()
        input_data = pd.DataFrame([data])

        # Make prediction
        prediction = gbm.predict(input_data)[0]
        return {"arrival_delay": prediction}
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Invalid value for {e.args[0]}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Run FastAPI server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
