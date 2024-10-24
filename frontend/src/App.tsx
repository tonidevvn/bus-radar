import { useEffect, useState } from 'react'
import { Layout, Menu, Input, Button, Divider } from 'antd'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'antd/dist/reset.css'
import 'leaflet/dist/leaflet.css'
import { Route, Stop, VehicleStatus } from './types/type'
import {
    GET_PREDICTIONS,
    GET_ROUTES,
    GET_STOPS,
    GET_VEHICLE_STATUS,
} from './api/bus_api'
import L from 'leaflet'
import StopInfo from './components/StopInfo'
import VehicleStatusInfo from './components/VehicleStatusInfo'
import StopScheduleInfo from './components/StopScheduleInfo'

const { Sider, Content } = Layout

const DefaultIcon = L.icon({
    iconUrl: '/circle.png',
    iconSize: [20, 20], // Size of the circle including the border (20px + 2px border on each side)
    iconAnchor: [12, 12], // Anchor to align the circle properly on the map
    popupAnchor: [0, -12], // Adjust popup location relative to the icon
})

const BusIcon = L.icon({
    iconUrl: 'https://windsor.mapstrat.com/images/vehicle.png', // Replace with the actual path to your bus icon image
    iconSize: [20, 20], // Adjust the size of the icon as needed
    iconAnchor: [12, 12], // Adjust anchor to align the icon properly on the map
    popupAnchor: [1, -30], // Adjust popup location relative to the icon
})

const CurrentLocationIcon = L.icon({
    iconUrl: '/character.png', // Replace with the actual path to your current location icon image
    iconSize: [50, 50], // Adjust the size of the icon as needed
    iconAnchor: [30, 30], // Adjust anchor to align the icon properly on the map
    popupAnchor: [1, -15], // Adjust popup location relative to the icon
})

const HighlightIcon = L.icon({
    iconUrl: '/highlight_circle.png', // Replace with an image to indicate the highlighted stop
    iconSize: [25, 25], // Slightly larger size for emphasis
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
})

function App() {
    const [pickRoute, setPickRoute] = useState<Route[]>([])
    const [pickVehicle, setPickVehicle] = useState<VehicleStatus | null>(null)
    const [pickStop, setPickStop] = useState<Stop | null>(null)
    const [routes, setRoutes] = useState<{ [key: string]: Route[] }>({})
    const [stops, setStops] = useState<Stop[]>([])
    const [vehicles, setVehicles] = useState<VehicleStatus[]>([])
    const [searchRoute, setSearchRoute] = useState('')
    const [currentLocation, setCurrentLocation] = useState<
        [number, number] | null
    >(null)

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
        const patternIDs = pickRoute.map((route) => route.patternID).join(',')

        if (patternIDs) {
            // Function to fetch stops and vehicle status
            const fetchData = () => {
                GET_STOPS(patternIDs).then((data) => {
                    setStops(data)
                })

                GET_VEHICLE_STATUS(patternIDs).then((data) => {
                    setVehicles(data)
                })
            }

            // Initial fetch before setting up the interval
            fetchData()

            // Set up interval to fetch data every 3 seconds
            const intervalId = setInterval(fetchData, 3000)

            // Clear the interval when component unmounts or when pickRoute changes
            return () => clearInterval(intervalId)
        }
    }, [pickRoute])

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

    useEffect(() => {
        if (pickStop) {
            if (pickStop.stopID) {
                GET_PREDICTIONS(pickStop.stopID).then((data) => {
                    console.log(data)
                })
            }
        }
    }, [pickStop])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                width={250}
                style={{
                    background: '#fff',
                    height: '100vh',
                    overflowY: 'auto',
                }}
            >
                <div style={{ padding: '16px' }}>
                    <Input
                        placeholder='Enter address or stop'
                        style={{ marginBottom: '8px' }}
                    />
                    <Input
                        placeholder='Enter route'
                        style={{ marginBottom: '8px' }}
                        onChange={(e) => setSearchRoute(e.target.value)}
                    />
                    <Button type='primary' style={{ width: '100%' }}>
                        Submit
                    </Button>
                </div>
                <Menu
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    style={{
                        height: 'calc(100vh - 120px)',
                        overflowY: 'auto',
                        borderRight: 0,
                    }}
                    items={Object.entries(routes)
                        .filter(([, route]) => {
                            if (!searchRoute) return true
                            return route[0].routeName
                                .toLowerCase()
                                .includes(searchRoute.toLowerCase())
                        })
                        .map(([routeID, route]) => ({
                            key: routeID,
                            label: route[0].routeName,
                        }))}
                    onSelect={({ key }) => {
                        const route = routes[key]
                        setPickRoute(route)
                    }}
                />
            </Sider>

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
                        {stops.map((stop) => (
                            <Marker
                                key={stop.stopID}
                                position={[stop.latitude, stop.longitude]}
                                icon={
                                    pickStop?.stopID === stop.stopID
                                        ? HighlightIcon
                                        : DefaultIcon
                                }
                                eventHandlers={{
                                    click: () => setPickStop(stop),
                                }}
                            >
                                <Popup>{stop.stopName}</Popup>
                            </Marker>
                        ))}

                        {vehicles.map((vehicle) => (
                            <Marker
                                key={vehicle.vehicleId}
                                position={[vehicle.lat, vehicle.lng]}
                                icon={BusIcon}
                                eventHandlers={{
                                    click: () => setPickVehicle(vehicle),
                                }}
                            ></Marker>
                        ))}
                    </MapContainer>
                </Content>

                <Sider
                    width={400}
                    style={{
                        background: '#f0f2f5',
                        height: '100vh',
                        overflowY: 'auto',
                    }}
                >
                    <div
                        style={{
                            overflowY: 'auto',
                            height: '50%',
                            padding: '8px',
                        }}
                    >
                        <Divider>Vehicle Status</Divider>
                        <VehicleStatusInfo vehicle={pickVehicle} />
                    </div>
                    <div style={{ padding: '8px' }}>
                        <Divider>Stop Information</Divider>
                        <StopInfo stop={pickStop} />
                    </div>
                    <div style={{ padding: '8px' }}>
                        <Divider>Stop Schedule</Divider>
                        {pickStop && (
                            <StopScheduleInfo stopID={pickStop.stopID} />
                        )}
                    </div>
                </Sider>
            </Layout>
        </Layout>
    )
}

export default App
