import { RootState } from "@reduxjs/toolkit/query";
import L from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { GET_STOPS } from "../api/bus_api";
import { setLoading } from "../store/slices/appSlice";
import { setPickStop } from "../store/slices/busSlice";
import { AppDispatch } from "../store/store";
import { Stop } from "../types/type";
import StopSchedule from "./StopSchedule";

const StopIcon = (size: number, iconUrl: string) =>
  L.icon({
    iconUrl,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });

const StopsRenderer = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const { patternIDs, pickStop } = useSelector((state: RootState) => state.bus);
  const [iconSize, setIconSize] = useState(20); // Default size for stops
  const defaultZoom = 13;
  const [zoom, setZoom] = useState(defaultZoom); // Default zoom level
  const map = useMap();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!patternIDs) {
      return;
    }
    GET_STOPS(patternIDs)
      .then((data) => {
        setStops(data);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [patternIDs, dispatch]);

  useEffect(() => {
    // Update icon size based on zoom level
    const updateIconSize = () => {
      const zoom = map.getZoom();
      const size = zoom < defaultZoom ? 8 : Math.max(8, zoom * 1.15); // Reduce the size when zooming out, capped at 8px minimum
      setIconSize(size);
      setZoom(zoom);
    };

    map.on("zoomend", updateIconSize); // Listen for zoom changes
    updateIconSize(); // Set size initially

    return () => {
      map.off("zoomend", updateIconSize); // Cleanup listener
    };
  }, [map]);

  return (
    <>
      {stops.map((stop) => (
        <Marker
          key={`${stop.stopID}-${zoom}`} // Key includes zoom to force re-render
          position={[stop.latitude, stop.longitude]}
          icon={
            pickStop?.stopID === stop.stopID
              ? StopIcon(iconSize + 5, "/highlight_circle.png") // Highlight icon
              : StopIcon(iconSize, "/circle.png") // Default icon
          }
          eventHandlers={{
            click: () => {
              dispatch(setPickStop(stop));
            },
          }}
        >
          <Popup>
            {/* <StopInfo stop={stop} /> */}
            <StopSchedule />
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default StopsRenderer;
