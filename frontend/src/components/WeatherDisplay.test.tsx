import { render, screen } from '@testing-library/react'
import { WeatherDisplay } from './WeatherDisplay'
import { vi } from 'vitest'

describe('WeatherDisplay', () => {
    const mockWeather = {
        temperature: 25.5,
        rainIntensity: 0,
        windSpeed: 10,
        humidity: 65,
    }

    beforeEach(() => {
        vi.mock('../api/weather', () => ({
            fetchWeather: vi.fn().mockResolvedValue(mockWeather),
        }))
    })

    it('displays weather information', async () => {
        render(<WeatherDisplay location={{ lat: 1.3521, lng: 103.8198 }} />)

        expect(await screen.findByText('25.5°C')).toBeInTheDocument()
        expect(await screen.findByText('Wind: 10 km/h')).toBeInTheDocument()
    })

    it('shows loading state', () => {
        render(<WeatherDisplay location={{ lat: 1.3521, lng: 103.8198 }} />)

        expect(screen.getByTestId('weather-loading')).toBeInTheDocument()
    })
})
