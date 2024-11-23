import 'chart.js/auto'
import React, { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from '../store/slices/weatherSlice'
import { AppDispatch, RootState } from '../store/store'

interface WeatherProps {
    currentLocation: [number, number] | null
}

const Weather: React.FC<WeatherProps> = ({ currentLocation }) => {
    const dispatch = useDispatch<AppDispatch>()
    const weatherData = useSelector((state: RootState) => state.weather.data)
    const status = useSelector((state: RootState) => state.weather.status)
    const [visible, setVisible] = useState(true)


    // Generate a unique key for the current request
    const key = useMemo(
        () =>
            `${currentLocation?.[0] || 0},${currentLocation?.[1] || 0},hourly`,
        [currentLocation]
    )
    const weather = weatherData[key] || [] // Retrieve cached data if available

    useEffect(() => {
        // Fetch only if the data for this key is not already cached
        if (!weather.length && currentLocation) {
            dispatch(
                fetchWeather({
                    lat: currentLocation ? currentLocation[0] : 0,
                    lng: currentLocation ? currentLocation[1] : 0,
                    timeline: 'hourly',
                })
            )
        }
    }, [currentLocation, dispatch, weather.length])

    if (status === 'loading' && !weather.length) {
        return <div style={styles.floatingContainer}>Loading...</div>
    }

    if (status === 'failed') {
        return (
            <div style={styles.floatingContainer}>
                Failed to load weather data
            </div>
        )
    }

    if (!weather.length) {
        return <div style={styles.floatingContainer}>No data available</div>
    }

    const labels = weather.map((item) =>
        new Date(item.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    )

    const chartData = {
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
            <div
                style={
                    visible
                        ? styles.hidePanelBtnVisible
                        : styles.hidePanelBtnHidden
                }
            >
                <a
                    onClick={() => setVisible(!visible)}
                    style={styles.hidePannelLink}
                >
                    {visible ? 'HIDE' : 'SHOW'}
                </a>
            </div>
            <div
                style={
                    visible
                        ? styles.chartContainerVisible
                        : styles.chartContainerHidden
                }
            >
                <Line
                    data={chartData}
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
    chartContainerVisible: {
        height: '200px',
        visibility: 'visible',
        transition: 'height 0.25s ease-in-out',
    },
    chartContainerHidden: {
        height: '0',
        visibility: 'hidden',
        transition: 'height 0.25s ease-in',
    },
    hidePannelLink: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    hidePanelBtnVisible: {
        position: 'absolute' as const,
        width: '25px',
        height: '25px',
        zIndex: 1009, // Ensure it's above other elements
        bottom: '220px',
        right: '25px',
    },
    hidePanelBtnHidden: {
        position: 'absolute' as const,
        width: '25px',
        height: '25px',
        zIndex: 1009, // Ensure it's above other elements
        bottom: '20px',
        right: '35px',
    },
}

export default Weather
