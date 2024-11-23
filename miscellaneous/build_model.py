import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import numpy as np
from linearmodels.system import SUR
import joblib
from

# Load your dataset
data = pd.read_csv("historical_data.csv")  # Replace with your file path

# Convert 'arrival_time' to seconds since midnight
data["arrival_seconds"] = pd.to_timedelta(data["arrival_time"]).dt.total_seconds()

# Remove rows where 'arrival_time' exceeds 23:59:59 (86399 seconds)
data = data[data["arrival_seconds"] <= 86399]

# Remove missing values or outliers if necessary
data = data.dropna()

# One-hot encode categorical variables like 'day'
data = pd.get_dummies(data, columns=["day"], drop_first=True)

# Standardize numeric variables if necessary
scaler = StandardScaler()
data[
    [
        "distance_to_stop",
        "rain_intensity",
        "snow_intensity",
        "temperature",
        "wind_speed",
    ]
] = scaler.fit_transform(
    data[
        [
            "distance_to_stop",
            "rain_intensity",
            "snow_intensity",
            "temperature",
            "wind_speed",
        ]
    ]
)

# Define the dependent variable: Arrival delay (arrival_time converted to seconds if needed)
data["arrival_delay"] = data["arrival_seconds"]

day_columns = [col for col in data.columns if col.startswith("day_")]
for col in day_columns:
    data[col] = data[col].astype(int)

# Define independent variables
X_vars = ["rain_intensity", "snow_intensity", "temperature", "wind_speed"] + [
    col for col in data.columns if col.startswith("day_")
]


# Create a dictionary for the SUR model
stops = data["stop_id"].unique()
equations = {}

for stop in stops:
    stop_data = data[data["stop_id"] == stop]
    y = stop_data["arrival_delay"].astype(float)
    X = stop_data[X_vars]
    
    # Convert all columns to numeric and handle any conversion errors
    # for col in X.columns:
    #     X[col] = pd.to_numeric(X[col], errors='coerce')
    
#     # Drop any rows with NaN values after conversion
#     X = X.dropna()
#     y = y[X.index]  # Keep only corresponding y values
    
    # Ensure there are enough observations
    print(stop, len(X), len(X_vars), X)
    break
    if len(X) <= len(X_vars):
        print(f"Skipping stop {stop} due to insufficient data.")
        continue
    #     # Convert to numpy array with float64 type
    X_array = X.values.astype(np.float64)
    
#     # Check if X is full rank
#     if np.linalg.matrix_rank(X_array) < X.shape[1]:
#         print(f"Skipping stop {stop} due to multicollinearity in regressors.")
#         continue

    equations[f"stop_{stop}"] = (y, X)

# Ensure there are equations to fit
if not equations:
    print("No suitable equations to fit.")
    exit()
# Prepare the data for the SUR model
sys = []

for equation in equations.values():
    y, X = equation
    sys.extend([y, X])
print(sys)
# Initialize and fit the SUR model using linearmodels
sure_model = SUR(sys)
results = sure_model.fit()

# # Display the summary
print(results.summary)aimport pandas as pd
from sklearn.preprocessing import StandardScaler
import numpy as np
from linearmodels.system import SUR
import joblib

# Load your dataset
data = pd.read_csv("historical_data.csv")  # Replace with your file path

# Convert 'arrival_time' to seconds since midnight
data["arrival_seconds"] = pd.to_timedelta(data["arrival_time"]).dt.total_seconds()

# Remove rows where 'arrival_time' exceeds 23:59:59 (86399 seconds)
data = data[data["arrival_seconds"] <= 86399]

# Remove missing values or outliers if necessary
data = data.dropna()

# One-hot encode categorical variables like 'day'
data = pd.get_dummies(data, columns=["day"], drop_first=True)

# Standardize numeric variables if necessary
scaler = StandardScaler()
data[
    [
        "distance_to_stop",
        "rain_intensity",
        "snow_intensity",
        "temperature",
        "wind_speed",
    ]
] = scaler.fit_transform(
    data[
        [
            "distance_to_stop",
            "rain_intensity",
            "snow_intensity",
            "temperature",
            "wind_speed",
        ]
    ]
)

# Define the dependent variable: Arrival delay (arrival_time converted to seconds if needed)
data["arrival_delay"] = data["arrival_seconds"]

# Define independent variables
day_columns = [col for col in data.columns if col.startswith("day_")]
X_vars = ["rain_intensity", "snow_intensity", "temperature", "wind_speed"] + day_columns

# Prepare equations for SUR
stops = data["stop_id"].unique()
equations = {}

for stop in stops:
    stop_data = data[data["stop_id"] == stop].copy()

    # Remove any rows with missing values in `stop_data`
    stop_data = stop_data.dropna(subset=["arrival_delay"] + X_vars)

    # Only include stops with at least 100 observations
    if len(stop_data) < 20:
        print(f"Skipping stop {stop} due to insufficient observations (< 100).")
        continue

    # Limit to 100 observations
    stop_data = stop_data.iloc[:20]

    # Define dependent and independent variables
    y = stop_data["arrival_delay"]
    X = stop_data[X_vars]

    # Convert to float64 to avoid casting issues
    y = y.astype(float)
    X = X.astype(float)

    # Check if X is full rank
    if np.linalg.matrix_rank(X) < X.shape[1]:
        print(f"Skipping stop {stop} due to multicollinearity in the regressor matrix.")
        continue

    # Create an equation for each stop
    equations[f"stop_{stop}"] = y, X)

# Ensure there are equations to fit
if not equations:
    print("No suitable equations to fit.")
    exit()

# Fit the SUR model using linearmodels
model = sm.SUR(equations)
results = model.fit()

# Display the summary
print(results.summary)
print(results.)

# Calculate RMSE for each equation
for stop in stops:
    equation_name = f"stop_{stop}"
    if equation_name in equations:
        y_true = equations[equation_name][0]
        y_pred = results.predict(equation_name)
        rmse = np.sqrt(np.mean((y_true - y_pred) ** 2))
        print(f"Stop {stop} RMSE: {rmse}")

# View coefficient estimates for all stops
for stop in stops:
    equation_name = f"stop_{stop}"
    if equation_name in results.params:
        print(f"Coefficients for Stop {stop}:")
        print(results.params[equation_name])


# # Calculate RMSE for each equation
# for stop in stops:
#     equation_name = f"stop_{stop}"
#     y_true = equations[equation_name][0]
#     y_pred = results.predict(equation_name)
#     rmse = np.sqrt(mean_squared_error(y_true, y_pred))
#     print(f"Stop {stop} RMSE: {rmse}")

# # View coefficient estimates for all stops
# for stop in stops:
#     print(f"Coefficients for Stop {stop}:")
#     print(results.params.loc[f"stop_{stop}"])

# # Update plotting section
# for stop in stops:
#     y_true = equations[f"stop_{stop}"][0]
#     y_pred = results.predict(f"stop_{stop}")

#     plt.scatter(y_true, y_pred, alpha=0.5)
#     plt.xlabel("True Arrival Delay")
#     plt.ylabel("Predicted Arrival Delay")
#     plt.title(f"Stop {stop}")
#     plt.show()

import seaborn as sns
import matplotlib.pyplot as plt
from tabulate import tabulate
import datetime

# ...existing code...

# After fitting the model, add styled visualization and reporting
plt.style.use('seaborn')
sns.set_palette("husl")

def format_seconds(seconds):
    return str(datetime.timedelta(seconds=int(seconds)))

results_table = []
for stop in stops:
    equation_name = f"stop_{stop}"
    if equation_name in equations:
        y_true = equations[equation_name][0]
        y_pred = results.predict(equation_name)
        rmse = np.sqrt(np.mean((y_true - y_pred) ** 2))
        
        # Create styled visualization
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))
        
        # Actual vs Predicted plot
        sns.scatterplot(x=y_true, y=y_pred, ax=ax1)
        ax1.plot([y_true.min(), y_true.max()], [y_true.min(), y_true.max()], 'r--')
        ax1.set_title(f'Stop {stop}: Actual vs Predicted Delays')
        ax1.set_xlabel('Actual Delay (seconds)')
        ax1.set_ylabel('Predicted Delay (seconds)')
        
        # Residuals plot
        residuals = y_true - y_pred
        sns.histplot(residuals, kde=True, ax=ax2)
        ax2.set_title('Distribution of Prediction Errors')
        ax2.set_xlabel('Error (seconds)')
        
        plt.tight_layout()
        plt.show()
        
        # Store results for table
        results_table.append([
            stop,
            format_seconds(y_true.mean()),
            format_seconds(y_pred.mean()),
            format_seconds(rmse),
            f"{(abs(residuals) < 300).mean():.1%}"  # % predictions within 5 minutes
        ])

# Print formatted results table
print("\nEstimation Results Summary:")
print(tabulate(results_table,
              headers=['Stop ID', 'Avg Actual', 'Avg Predicted', 'RMSE', 'Within 5min'],
              tablefmt='grid'))

# Save results
joblib.dump(results, "sur_model_results.pkl")
