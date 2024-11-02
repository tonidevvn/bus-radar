import { Layout } from 'antd'
import 'antd/dist/reset.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useDispatch } from 'react-redux'
import { GET_ROUTES } from './api/bus_api'
import LeftMenu from './components/Menu'
import RouteBuilderRenderer from './components/RouterBuilderRenderer'
import StopsRenderer from './components/StopRenderer'
import VehicleRenderer from './components/VehicleRenderer'
import Weather from './components/Weather'
import { AppDispatch } from './store/store'
import { Route } from './types/type'

const { Content } = Layout

const CurrentLocationIcon = L.icon({
    iconUrl: '/character.png', // Replace with the actual path to your current location icon image
    iconSize: [50, 50], // Adjust the size of the icon as needed
    iconAnchor: [30, 30], // Adjust anchor to align the icon properly on the map
    popupAnchor: [1, -15], // Adjust popup location relative to the icon
})

function App() {
    const [pickRoute, setPickRoute] = useState<Route[]>([])
    const [routes, setRoutes] = useState<{ [key: string]: Route[] }>({})
    const [currentLocation, setCurrentLocation] = useState<
        [number, number] | null
    >(null)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        GET_ROUTES().then((data) => {
            const processedData: { [key: string]: Route[] } = {}
            for (const route of data) {
                if (!processedData[route.routeID]) {
                    processedData[route.routeID] = [route]
                } else {
                    processedData[route.routeID].push(route)
                }
            }
            setRoutes(processedData)
        })
    }, [])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation([
                    position.coords.latitude,
                    position.coords.longitude,
                ])
            })
        }
    }, [])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <LeftMenu routes={routes} />

            <Layout>
                <Content style={{ padding: '24px', height: '100vh' }}>
                    <MapContainer
                        center={currentLocation || [42.32501, -82.93877]}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        {currentLocation && (
                            <Marker
                                position={currentLocation}
                                icon={CurrentLocationIcon}
                            >
                                <Popup>Your current location</Popup>
                            </Marker>
                        )}

                        <StopsRenderer />
                        <VehicleRenderer />
                        <RouteBuilderRenderer />

                        <Weather currentLocation={currentLocation} />
                    </MapContainer>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App
