import React from 'react'
import { Card, Tag } from 'antd'
import { Stop } from '../types/type'

const StopInfo = ({ stop }: { stop: Stop | null }) => {
    if (!stop) return null

    return (
        <Card style={styles.card} title={`Stop Information: ${stop.stopName}`}>
            <div style={styles.infoContainer}>
                <InfoItem label='Stop Number' value={stop.stopNumber} />
                <InfoItem label='Pattern ID' value={stop.patternID} />
                <InfoItem
                    label='Public'
                    value={
                        stop.isPublic ? (
                            <Tag color='green'>Yes</Tag>
                        ) : (
                            <Tag color='red'>No</Tag>
                        )
                    }
                />
                <InfoItem
                    label='Active'
                    value={
                        stop.isActive ? (
                            <Tag color='green'>Active</Tag>
                        ) : (
                            <Tag color='red'>Inactive</Tag>
                        )
                    }
                />
            </div>
        </Card>
    )
}

const InfoItem = ({ label, value }) => {
    return (
        <div style={styles.infoItem}>
            <span style={styles.label}>{label}:</span>
            <span style={styles.value}>{value}</span>
        </div>
    )
}

const styles = {
    card: {
        maxWidth: '500px',
        margin: '20px auto',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: '1px solid #f0f0f0',
    },
    label: {
        fontWeight: 'bold',
        color: '#595959',
    },
    value: {
        color: '#262626',
    },
}

export default StopInfo
