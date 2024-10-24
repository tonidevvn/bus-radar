import { Card, Descriptions, Tag, Image } from 'antd'
import { VehicleStatus } from '../types/type'

const VehicleStatusInfo = ({ vehicle }: { vehicle: VehicleStatus | null }) => {
    if (!vehicle) return null

    const {
        patternId,
        name,
        vehicleCapacityIndicator,
        isLight,
        isMedium,
        isFull,
        headsignText,
        vehicleId,
        lastUpdate,
        lat,
        lng,
        velocity,
        bearing,
        vehicleStateId,
        bypassDailyTripId,
    } = vehicle
    const getCapacityTag = () => {
        if (isFull) return <Tag color='red'>Full</Tag>
        if (isMedium) return <Tag color='orange'>Medium</Tag>
        if (isLight) return <Tag color='green'>Light</Tag>
        return <Tag color='gray'>Unknown</Tag>
    }

    return (
        <Card
            title={`Vehicle Status: ${name}`}
            bordered={true}
            style={{ width: '100%' }}
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label='Pattern ID'>
                    {patternId}
                </Descriptions.Item>
                <Descriptions.Item label='Vehicle ID'>
                    {vehicleId}
                </Descriptions.Item>
                <Descriptions.Item label='Headsign Text'>
                    {headsignText}
                </Descriptions.Item>
                <Descriptions.Item label='Capacity'>
                    {getCapacityTag()}
                </Descriptions.Item>
                <Descriptions.Item label='Vehicle Capacity Indicator'>
                    {vehicleCapacityIndicator}
                </Descriptions.Item>
                <Descriptions.Item label='Location'>{`Lat: ${lat}, Lng: ${lng}`}</Descriptions.Item>
                <Descriptions.Item label='Velocity'>
                    {velocity} km/h
                </Descriptions.Item>
                <Descriptions.Item label='Bearing'>
                    {bearing}°
                </Descriptions.Item>
                <Descriptions.Item label='Last Update'>
                    {lastUpdate}
                </Descriptions.Item>
                <Descriptions.Item label='Vehicle State ID'>
                    {vehicleStateId}
                </Descriptions.Item>
                <Descriptions.Item label='Bypass Daily Trip ID'>
                    {bypassDailyTripId}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export default VehicleStatusInfo
