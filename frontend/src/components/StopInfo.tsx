import { useEffect, useState } from 'react'
import { Card } from 'antd'
import dayjs from 'dayjs'
import { Stop, StopSchedule } from '../types/type'
import { GET_PREDICTIONS } from '../api/bus_api'

const StopInfo = ({ stop }: { stop: Stop | null }) => {
    const [schedule, setSchedule] = useState<StopSchedule>({
        stopCode: '',
        stopName: '',
        reqTime: new Date(),
        failed: false,
        grpByPtrn: [],
    })

    useEffect(() => {
        if (!stop) return

        GET_PREDICTIONS(stop.stopID).then((data) => {
            setSchedule(data)
        })
    }, [stop])

    if (!stop) return null

    return (
        <Card
            style={styles.card}
            bordered={false}
            title={
                <span
                    style={styles.cardTitle}
                >{`${stop.stopNumber} - ${stop.stopName}`}</span>
            }
        >
            <ul style={styles.arrivalsList}>
                {schedule.grpByPtrn.length > 0 &&
                    schedule.grpByPtrn[0].predictions.map(
                        (prediction, index) => {
                            const predictTime = dayjs(prediction.predictTime)
                            const minutesFromNow = predictTime.diff(
                                dayjs(),
                                'minute'
                            )
                            return (
                                <li key={index} style={styles.arrivalItem}>
                                    {index === 0
                                        ? `${minutesFromNow} minutes from now`
                                        : predictTime.format('HH:mm')}
                                </li>
                            )
                        }
                    )}
            </ul>
        </Card>
    )
}

const styles = {
    card: {
        maxWidth: '600px',
        margin: '30px auto',
        borderRadius: '16px',
        backgroundColor: '#f9f9f9',
    },
    cardTitle: {
        fontSize: '1rem',
        color: '#333',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e0e0e0',
    },
    label: {
        fontWeight: '600',
        color: '#4a4a4a',
    },
    value: {
        color: '#1a1a1a',
    },
    arrivalsTitle: {
        fontSize: '1rem',
        color: '#333',
        marginBottom: '10px',
    },
    arrivalsList: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    arrivalItem: {
        backgroundColor: '#e6f7ff',
        padding: '8px',
        borderRadius: '8px',
        marginBottom: '8px',
        fontWeight: '500',
    },
}

export default StopInfo
