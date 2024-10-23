import React, { useEffect, useState } from 'react'
import { Layout, Menu, Input, Button } from 'antd'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'antd/dist/reset.css'
import 'leaflet/dist/leaflet.css'
import { Route } from './types/routes'
import { GET_ROUTES } from './api/bus_api'

const { Sider, Content } = Layout

function App() {
    const [pickRoute, setPickRoute] = useState<Route>()
    const [routes, setRoutes] = useState<{ [key: string]: Route[] }>({})

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

    console.log(pickRoute)

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
                        // const route = routes.find(
                        //     (route) => route.patternID === parseInt(key)
                        // )
                        // if (route) {
                        //     setPickRoute(route)
                        // }
                    }}
                ></Menu>
            </Sider>

            <Layout>
                <Content style={{ padding: '24px', height: '100vh' }}>
                    <MapContainer
                        center={[51.505, -0.09]}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
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
