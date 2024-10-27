import React, { useEffect, useState } from 'react'
import { GET_WEATHER } from '../api/weather_api'
import { Timeline, WeatherValue } from '../types/type'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

interface WeatherProps {
    currentLocation: [number, number] | null
}

const Weather: React.FC<WeatherProps> = ({ currentLocation }) => {
    const [weather, setWeather] = useState<Timeline[]>([])

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await GET_WEATHER({
                    lat: currentLocation ? currentLocation[0] : 0,
                    lng: currentLocation ? currentLocation[1] : 0,
                    timeline: 'hourly',
                })
                setWeather(data)
            } catch (error) {
                console.error('Error fetching weather data:', error)
            }
        }

        fetchWeather()
    }, [currentLocation])

    if (!weather.length) {
        return <div style={styles.floatingContainer}>Loading...</div>
    }

    const labels = weather.map((item) =>
        new Date(item.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    )

    const data = {
        labels,
        datasets: [
            {
                label: 'Temperature (℃)',
                data: weather.map((item) => item.values.temperature),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
            {
                label: 'Humidity (%)',
                data: weather.map((item) => item.values.humidity),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
            {
                label: 'Wind Speed (km/h)',
                data: weather.map((item) => item.values.windSpeed),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'UV Index',
                data: weather.map((item) => item.values.uvIndex),
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                fill: true,
            },
            {
                label: 'Precipitation Probability (%)',
                data: weather.map(
                    (item) => item.values.precipitationProbability
                ),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            },
            {
                label: 'Visibility (km)',
                data: weather.map((item) => item.values.visibility),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: true,
            },
        ],
    }

    return (
        <div style={styles.floatingContainer}>
            <h1 style={styles.heading}>Weather Trend</h1>
            <div style={styles.chartContainer}>
                <Line
                    data={data}
                    options={{ responsive: true, maintainAspectRatio: false }}
                />
            </div>
        </div>
    )
}

const styles = {
    floatingContainer: {
        position: 'absolute' as const,
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        // maxWidth: '400px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        padding: '15px',
        textAlign: 'center' as const,
        zIndex: 1000, // Ensure it's above other elements
        borderRadius: '10px',
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
    },
    heading: {
        margin: '0 0 10px 0',
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    chartContainer: {
        height: '200px',
    },
}

export default Weather
