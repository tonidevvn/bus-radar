import L from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { GET_VEHICLE_STATUS } from "../api/bus_api";
import { VehicleStatus } from "../types/type";
import { getCurrentDayOfWeek } from "../utils/Date";
import VehicleStatusInfo from "./VehicleStatusInfo";

const BusIcon = (size: number) =>
  L.icon({
    iconUrl: "/vehicle.png", // Replace with your bus icon
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [1, -size / 2],
  });

const VehicleRenderer = () => {
  const [vehicles, setVehicles] = useState<VehicleStatus[]>([]);
  const { routeID, patternIDs } = useSelector((state: RootState) => state.bus);
  const [iconSize, setIconSize] = useState(50); // Default size for vehicles
  const defaultZoom = 13;
  const [zoom, setZoom] = useState(defaultZoom); // Default zoom level
  const map = useMap();

  useEffect(() => {
    const fetchData = () => {
      if (!patternIDs) {
        return;
      }
      GET_VEHICLE_STATUS(patternIDs, routeID, getCurrentDayOfWeek()).then(
        (data) => {
          setVehicles(data);
        }
      );
    };

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, [patternIDs]);

  useEffect(() => {
    // Update icon size based on zoom level
    const updateIconSize = () => {
      const zoom = map.getZoom();
      const size = zoom > defaultZoom ? 50 : zoom < 10 ? 25 : 35; // Reduce the size when zooming out
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
      {vehicles.map((vehicle) => (
        <Marker
          key={`${vehicle.vehicleId}-${zoom}`} // Key includes zoom to force re-render
          position={[vehicle.lat, vehicle.lng]}
          icon={BusIcon(iconSize)}
          zIndexOffset={9999}
        >
          <Popup>
            <VehicleStatusInfo vehicle={vehicle} />
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default VehicleRenderer;
