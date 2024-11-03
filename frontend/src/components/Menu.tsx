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
            className="bg-[#f0f2f5] h-screen overflow-y-auto border-r border-r-[#d9d9d9] border-r-solid"
        >
            <div className="p-[16px]">
                <Title
                    level={4}
                    className="mb-[16px] text-[#001529]"
                >
                    Route Finder
                </Title>
                <Space direction='vertical'
                       className="w-full"
                       size={16}>
                    <Input
                        placeholder='Enter route'
                        className="rounded-[8px]"
                        onChange={(e) => setSearchRoute(e.target.value)}
                    />
                </Space>
            </div>
            <Menu
                mode='inline'
                defaultSelectedKeys={['1']}
                className="h-[calc(100vh - 180px)] overflow-y-auto border-r-0"
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
