import { Input, Layout, Menu, Space, Typography } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPatternIDs } from '../store/slices/busSlice'
import { AppDispatch } from '../store/store'
import { Route } from '../types/type'

const { Sider } = Layout
const { Title } = Typography

const LeftMenu = ({ routes }: { routes: { [key: string]: Route[] } }) => {
    const dispatch = useDispatch<AppDispatch>()
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
                    const patternIDs = route.map((r) => r.patternID).join(',')
                    dispatch(setPatternIDs(patternIDs))
                }}
            />
        </Sider>
    )
}

export default LeftMenu
