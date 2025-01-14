import { render, screen } from '@testing-library/react'
import { BusStop } from './BusStop'
import { vi } from 'vitest'

describe('BusStop', () => {
    const mockStop = {
        id: 'STOP001',
        name: 'Test Stop',
        location: { lat: 1.3521, lng: 103.8198 },
        routes: ['1', '2'],
    }

    it('renders stop information correctly', () => {
        render(<BusStop {...mockStop} />)

        expect(screen.getByText('Test Stop')).toBeInTheDocument()
        expect(screen.getByText('Routes: 1, 2')).toBeInTheDocument()
    })

    it('shows distance when user location is available', () => {
        const userLocation = { lat: 1.3522, lng: 103.8199 }
        render(<BusStop {...mockStop} userLocation={userLocation} />)

        expect(screen.getByText(/\d+m away/)).toBeInTheDocument()
    })
})
