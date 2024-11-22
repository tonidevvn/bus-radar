import { Spin } from 'antd'
import React from 'react'

interface LoadingWrapperProps {
    loading: boolean
    children: React.ReactNode
}

function LoadingWrapper({ loading, children }: LoadingWrapperProps) {
    return (
        <div>
            {loading && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        zIndex: 1000,
                    }}
                >
                    <Spin size='large' />
                </div>
            )}
            <div style={{ opacity: loading ? 0.5 : 1 }}>{children}</div>
        </div>
    )
}

export default LoadingWrapper
