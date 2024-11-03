import { RootState } from '@reduxjs/toolkit/query'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { GET_STOP_TIMES } from '../api/bus_api'
import { StopScheduleData } from '../types/type'

const StopSchedule = () => {
    const { routeID, pickStop } = useSelector((state: RootState) => state.bus)
    const [stopSchedule, setStopSchedule] = useState<StopScheduleData[]>([])
    const nextAvailableRef = useRef<HTMLTableRowElement | null>(null)

    // Get the current day of the week, e.g., "Monday"
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' })

    useEffect(() => {
        if (pickStop) {
            GET_STOP_TIMES(
                routeID,
                pickStop?.stopNumber,
                currentDay.toLowerCase()
            ).then((data) => {
                setStopSchedule(data)
            })
        }
    }, [pickStop, routeID, currentDay])

    useEffect(() => {
        if (nextAvailableRef.current) {
            nextAvailableRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
    }, [stopSchedule])

    const currentTime = new Date().toTimeString().slice(0, 5) // "HH:mm" format

    return (
        <div className='p-6 font-sans'>
            <h2 className='text-2xl font-bold mb-4'>
                Schedule for Stop: {pickStop?.stopNumber}
            </h2>
            {stopSchedule.length === 0 ? (
                <p className='text-gray-600'>No schedule available</p>
            ) : (
                <div className='overflow-y-auto max-h-96 border border-gray-300 rounded-md shadow-sm'>
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr>
                                <th className='border-b-2 p-4 text-left font-semibold bg-gray-100 sticky top-0'>
                                    Departure Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {stopSchedule.map((schedule, index) => {
                                const isPast =
                                    schedule.departureTime < currentTime
                                const isNextAvailable =
                                    !isPast && !nextAvailableRef.current

                                return (
                                    <tr
                                        key={index}
                                        className={`${
                                            isPast
                                                ? 'blur-sm opacity-50 text-gray-500'
                                                : ''
                                        }`}
                                        ref={
                                            isNextAvailable
                                                ? nextAvailableRef
                                                : null
                                        }
                                    >
                                        <td className='p-4 border-b'>
                                            {schedule.departureTime}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default StopSchedule
