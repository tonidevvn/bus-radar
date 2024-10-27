import { Card, Tag, Space, Typography } from 'antd'
import { VehicleStatus } from '../types/type'
import { busIcon } from '../constants/bus'
import dayjs from 'dayjs'

const { Text } = Typography

const VehicleStatusInfo = ({ vehicle }: { vehicle: VehicleStatus | null }) => {
    if (!vehicle) return null

    const getCapacityTag = () => {
        switch (true) {
            case vehicle.isFull:
                return (
                    <Tag color='red'>
                        <Space>
                            <img
                                src={busIcon.full}
                                alt='Full Capacity'
                                style={{ width: 100 }}
                            />
                            <Text strong>Full</Text>
                        </Space>
                    </Tag>
                )
            case vehicle.isMedium:
                return (
                    <Tag color='orange'>
                        <Space>
                            <img
                                src={busIcon.medium}
                                alt='Medium Capacity'
                                style={{ width: 100 }}
                            />
                            <Text strong>Medium</Text>
                        </Space>
                    </Tag>
                )
            case vehicle.isLight:
                return (
                    <Tag color='green'>
                        <Space>
                            <img
                                src={busIcon.light}
                                alt='Light Capacity'
                                style={{ width: 100 }}
                            />
                            <Text strong>Light</Text>
                        </Space>
                    </Tag>
                )
            default:
                return (
                    <Tag color='gray'>
                        <Space>
                            <img
                                src={busIcon.unavailable}
                                alt='Unavailable Capacity'
                                style={{ width: 100 }}
                            />
                            <Text strong>Unavailable</Text>
                        </Space>
                    </Tag>
                )
        }
    }

    const vehicleDetails = [
        { label: 'Capacity', value: getCapacityTag() },
        {
            label: 'Vehicle Capacity Indicator',
            value: vehicle.vehicleCapacityIndicator,
        },
        { label: 'Velocity', value: `${vehicle.velocity} km/h` },
        { label: 'Bearing', value: `${vehicle.bearing}°` },
        {
            label: 'Last Update',
            value: dayjs(vehicle.lastUpdate).format('YYYY-MM-DD HH:mm:ss'),
        },
    ]

    return (
        <Card
            title={
                <Text strong style={{ fontSize: '18px' }}>
                    {`${vehicle.name} - ${vehicle.headsignText}`}
                </Text>
            }
            bordered={false}
            bodyStyle={{ padding: '16px' }}
            style={{ marginBottom: '16px', borderRadius: '8px' }}
        >
            <Space direction='vertical' style={{ width: '100%' }}>
                {vehicleDetails.map(({ label, value }) => (
                    <div
                        key={label}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '8px',
                        }}
                    >
                        <Text type='secondary' strong>
                            {label}:
                        </Text>
                        <Text>{value}</Text>
                    </div>
                ))}
            </Space>
        </Card>
    )
}

export default VehicleStatusInfo
