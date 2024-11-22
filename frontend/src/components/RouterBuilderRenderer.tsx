import { useEffect, useState } from 'react'
import { Polyline } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { GET_ROUTES_BUILDER } from '../api/bus_api'
import { RouteBuilder } from '../types/type'

const RouteBuilderRenderer = () => {
    const patternIDs = useSelector((state: RootState) => state.bus.patternIDs)
    const [routesBuilder, setRoutesBuilder] = useState<RouteBuilder[]>([])
    useEffect(() => {
        if (!patternIDs) {
            return
        }
        GET_ROUTES_BUILDER(patternIDs).then((data) => {
            setRoutesBuilder(data)
        })
    }, [patternIDs])

    return (
        <>
            {routesBuilder.length > 0
                ? routesBuilder.map((routeBuilder, index) => (
                      <Polyline
                          key={index}
                          positions={routeBuilder.points.map((p) => [
                              p.latitude,
                              p.longitude,
                          ])}
                      />
                  ))
                : null}
        </>
    )
}

export default RouteBuilderRenderer
