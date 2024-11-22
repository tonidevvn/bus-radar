import L from 'leaflet'
import { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { GET_VEHICLE_STATUS } from '../api/bus_api'
import { VehicleStatus } from '../types/type'
import { getCurrentDayOfWeek } from '../utils/Date'
import VehicleStatusInfo from './VehicleStatusInfo'

const BusIcon = L.icon({
    iconUrl: 'https://windsor.mapstrat.com/images/vehicle.png', // Replace with the actual path to your bus icon image
    iconSize: [20, 20], // Adjust the size of the icon as needed
    iconAnchor: [12, 12], // Adjust anchor to align the icon properly on the map
    popupAnchor: [1, -30], // Adjust popup location relative to the icon
})

const VehicleRenderer = () => {
    const [vehicles, setVehicles] = useState<VehicleStatus[]>([])
    const { routeID, patternIDs } = useSelector((state: RootState) => state.bus)
    useEffect(() => {
        const fetchData = () => {
            if (!patternIDs) {
                return
            }
            GET_VEHICLE_STATUS(patternIDs, routeID, getCurrentDayOfWeek()).then(
                (data) => {
                    setVehicles(data)
                }
            )
        }

        const interval = setInterval(fetchData, 3000)

        return () => clearInterval(interval)
    }, [patternIDs])

    return (
        <>
            {vehicles.map((vehicle) => (
                <Marker
                    key={vehicle.vehicleId}
                    position={[vehicle.lat, vehicle.lng]}
                    icon={BusIcon}
                >
                    <Popup>
                        <VehicleStatusInfo vehicle={vehicle} />
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

export default VehicleRenderer
