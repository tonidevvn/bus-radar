import React, { useEffect, useState } from 'react'
import { Layout, Menu, Input, Button } from 'antd'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'antd/dist/reset.css'
import 'leaflet/dist/leaflet.css'
import { Route, Stop, VehicleStatus } from './types/type'
import { GET_ROUTES, GET_STOPS, GET_VEHICLE_STATUS } from './api/bus_api'
import L from 'leaflet'

const { Sider, Content } = Layout

const DefaultIcon = L.icon({
    iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [15, 25], // Reduced size of the icon
    iconAnchor: [7, 25], // Adjusted to match the reduced icon size
    popupAnchor: [1, -20], // Adjusted for better popup alignment
    shadowSize: [25, 25], // Reduced shadow size to match the icon
})

const BusIcon = L.icon({
    iconUrl: '/bus.png', // Replace with the actual path to your bus icon image
    iconSize: [40, 40], // Adjust the size of the icon as needed
    iconAnchor: [15, 30], // Adjust anchor to align the icon properly on the map
    popupAnchor: [1, -30], // Adjust popup location relative to the icon
})

function App() {
    const [pickRoute, setPickRoute] = useState<Route[]>([])
    const [routes, setRoutes] = useState<{ [key: string]: Route[] }>({})
    const [stops, setStops] = useState<Stop[]>([])
    const [vehicles, setVehicles] = useState<VehicleStatus[]>([])

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
                    items={Object.entries(routes).map(([routeID, route]) => ({
                        key: routeID,
                        label: route[0].routeName,
                    }))}
                    onSelect={({ key }) => {
                        const route = routes[key]
                        setPickRoute(route)
                    }}
                ></Menu>
            </Sider>

            <Layout>
                <Content style={{ padding: '24px', height: '100vh' }}>
                    <MapContainer
                        center={[42.32501, -82.93877]}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        {stops.map((stop) => (
                            <Marker
                                key={stop.stopID}
                                position={[stop.latitude, stop.longitude]}
                                icon={DefaultIcon}
                            >
                                <Popup>
                                    {stop.stopName} <br /> {stop.stopCode}
                                </Popup>
                            </Marker>
                        ))}
                        {vehicles.map((vehicle) => (
                            <Marker
                                key={vehicle.vehicleId}
                                position={[vehicle.lat, vehicle.lng]}
                                icon={BusIcon}
                            >
                                <Popup>
                                    {vehicle.name} <br /> {vehicle.headsignText}
                                </Popup>
                            </Marker>
                        ))}
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App
