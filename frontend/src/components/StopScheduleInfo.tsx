import React, { useEffect, useState } from 'react'
import { Card, Typography, List, Alert } from 'antd'
import { StopSchedule } from '../types/type'
import { GET_PREDICTIONS } from '../api/bus_api'

const { Title, Paragraph } = Typography

const StopScheduleInfo = ({ stopID }: { stopID: number | undefined }) => {
    const [schedule, setSchedule] = useState<StopSchedule>({
        stopCode: '',
        stopName: '',
        reqTime: new Date(),
        failed: false,
        grpByPtrn: [],
    })

    useEffect(() => {
        if (!stopID) return

        GET_PREDICTIONS(stopID).then((data) => {
            setSchedule(data)
        })
    }, [stopID])

    return (
        <Card style={{ marginBottom: 20 }}>
            <Title level={2}>{schedule.stopName || 'Unknown Stop'}</Title>
            <Paragraph>
                <strong>Stop Code:</strong> {schedule.stopCode}
            </Paragraph>
            <Paragraph>
                <strong>Request Time:</strong>{' '}
                {schedule.reqTime.toLocaleString()}
            </Paragraph>
            {schedule.failed ? (
                <Alert
                    message='Failed to retrieve schedule'
                    type='error'
                    showIcon
                />
            ) : (
                <div>
                    {schedule.grpByPtrn.map((pattern) => (
                        <Card
                            key={pattern.patternId}
                            style={{ marginBottom: 20 }}
                        >
                            <Title level={3}>
                                Route: {pattern.routeName || 'Unknown Route'}
                            </Title>
                            <Paragraph>
                                <strong>Route Number:</strong>{' '}
                                {pattern.routeNum}
                            </Paragraph>
                            <Paragraph>
                                <strong>Pattern Name:</strong>{' '}
                                {pattern.patternName || 'Unknown Pattern'}
                            </Paragraph>
                            <Paragraph>
                                <strong>Pattern Start:</strong>{' '}
                                {new Date(pattern.ptrnStart).toLocaleString()}
                            </Paragraph>
                            <Title level={4}>Predictions:</Title>
                            {pattern.predictions.length === 0 ? (
                                <Paragraph>No Predictions Available</Paragraph>
                            ) : (
                                <List
                                    dataSource={pattern.predictions}
                                    renderItem={(prediction) => (
                                        <List.Item>
                                            <Paragraph>
                                                <strong>
                                                    Prediction Time:
                                                </strong>{' '}
                                                {new Date(
                                                    prediction.predictTime
                                                ).toLocaleString()}
                                                <br />
                                                <strong>
                                                    Schedule Time:
                                                </strong>{' '}
                                                {new Date(
                                                    prediction.scheduleTime
                                                ).toLocaleString()}
                                                <br />
                                                <strong>Type:</strong>{' '}
                                                {prediction.predictionType}
                                            </Paragraph>
                                        </List.Item>
                                    )}
                                />
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </Card>
    )
}

export default StopScheduleInfo
