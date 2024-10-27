import { Button, Input, Menu, Layout, Typography, Space } from 'antd'
import React, { useState } from 'react'
import { Route } from '../types/type'

const { Sider } = Layout
const { Title } = Typography

const LeftMenu = ({
    routes,
    setPickRoute,
}: {
    routes: { [key: string]: Route[] }
    setPickRoute: (routes: Route[]) => void
}) => {
    const [searchRoute, setSearchRoute] = useState('')

    return (
        <Sider
            width={280}
            style={{
                background: '#f0f2f5',
                height: '100vh',
                overflowY: 'auto',
                borderRight: '1px solid #d9d9d9',
            }}
        >
            <div style={{ padding: '16px' }}>
                <Title
                    level={4}
                    style={{ marginBottom: '16px', color: '#001529' }}
                >
                    Route Finder
                </Title>
                <Space direction='vertical' style={{ width: '100%' }} size={16}>
                    <Input
                        placeholder='Enter route'
                        style={{ borderRadius: '8px' }}
                        onChange={(e) => setSearchRoute(e.target.value)}
                    />
                </Space>
            </div>
            <Menu
                mode='inline'
                defaultSelectedKeys={['1']}
                style={{
                    height: 'calc(100vh - 180px)',
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
    )
}

export default LeftMenu
