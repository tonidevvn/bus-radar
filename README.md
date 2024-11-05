# BusRadar - Real-time Bus Tracking Platform

BusRadar is a real-time bus tracking system designed to improve public transportation efficiency by providing accurate arrival time predictions and delay forecasts. Developed with a **Java Spring Boot backend** and a **ReactJS frontend**, the platform integrates live GPS data with predictive analytics to offer an enhanced commuter experience and valuable insights for transport authorities.

> **Note**: This project is developed for academic purposes under the course **COMP 8157: Advanced Database Topics** at the University of Windsor.  
> We developed this project under the guidance and support of **Dr. Abdulrauf Gidado**.

## Project Structure

### Backend

The backend, built using Java Spring Boot, is responsible for:

- **Real-time Data Processing**: Collecting and updating live GPS data from buses.
- **Predictive Analysis**: Implementing a Seemingly Unrelated Regression Equation (SURE) model to predict delays by factoring in real-time variables like traffic, weather, and calendar events.
- **Data Management**: Utilizing MongoDB for scalable storage and retrieval of both real-time and historical data.

### Frontend

The frontend, developed with ReactJS, provides an intuitive interface that allows users to:

- **Track Live Bus Locations**: View buses in real-time on an interactive map.
- **Check Arrival Times and Delays**: Access accurate arrival predictions and potential delays.
- **Access Route and Service Information**: Browse available routes, bus stop details, and receive alerts for any disruptions or schedule changes.

## Key Features

- **Real-time Bus Arrival Predictions**: Leveraging the SURE model to provide accurate arrival time estimates.
- **Interactive Route Maps**: Visual display of active routes, live locations, and potential delays.
- **Comprehensive Data Integration**: Prediction model considers traffic, weather, and operational factors for robust performance.
- **Analytics for Authorities**: Insights to help transport authorities optimize routes and schedules based on observed patterns and data.

## Project Setup and Running Guide

This guide will help you set up and run the project, which includes:

- Running MySQL as a Docker container.
- Running the Spring Boot backend.
- Running the Vite + React frontend.

## Prerequisites

- **Docker**: Ensure Docker is installed and running.
- **Java**: JDK 21 or later is required to run the backend.
- **Node.js and npm**: Required to run the frontend. Node.js version 14 or higher is recommended.

## Steps to Run the Project

### 1. Start MySQL using Docker Compose

The `docker-compose.yml` file is configured to set up MySQL with persistent storage.

To start MySQL, run:

```bash
docker-compose up -d
```

### 2. Run the Backend (Spring Boot)

Navigate to the backend directory

```bash
cd .\backend
```

To start the Spring Boot application:

```bash
mvn spring-boot:run
```

### 3. Run the Frontend (Vite + React)

Navigate to the frontend directory

```bash
cd .\frontend
```

To install dependencies

```bash
npm install
```

To start the frontend:

```bash
npm run dev
```

The frontend server will be available on http://localhost:5173 by default.

## Accessing the Application

### Frontend:

Visit http://localhost:5173 to access the frontend.

### Backend API:

The backend is accessible at http://localhost:8080
