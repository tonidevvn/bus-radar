import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_DELAY_AT_STOP } from '../api/bus_api'
import { Stop, StopDelay } from '../types/type'
import { AppDispatch } from '../store/store'
import { setStopDelays } from '../store/slices/busSlice'
import { Card, List, Typography } from 'antd'

const { Title, Text } = Typography

function BadStops() {
    const { availableStops, stopDelays } = useSelector(
        (state: RootState) => state.bus
    )
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const stopNumbers = availableStops
            .map((stop: Stop) => stop.stopNumber)
            .join(',')
        GET_DELAY_AT_STOP(stopNumbers).then((data) => {
            dispatch(setStopDelays(data))
        })
    }, [availableStops, dispatch])

    return (
        <Card
            title='Bad Stops'
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                width: 300,
                backgroundColor: 'white',
                zIndex: 1000,
            }}
        >
            <List
                dataSource={stopDelays
                    .filter((a: StopDelay) => a.averageDelay > 0)
                    .sort(
                        (a: StopDelay, b: StopDelay) =>
                            b.averageDelay - a.averageDelay
                    )}
                renderItem={(stop: StopDelay) => (
                    <List.Item key={stop.stopId}>
                        <Text strong>{stop.stopId}</Text> - {stop.averageDelay}{' '}
                        minutes
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default BadStops
