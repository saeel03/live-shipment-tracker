// src/components/ShipmentMap.tsx
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import { shipments } from "../data";
import type { FlightData } from "../data";
import AnimatedRoute from "./AnimatedRoute";
import { createCustomIcon, createPlaneIcon, getPointsFromWaypoints } from "../utils/mapUtils";

/**
 * Component to render a single shipment's route, markers, and plane.
 */
const SingleShipment = ({ data }: { data: FlightData }) => {
  // Convert flat waypoints to [lat, lng] tuples
  const points = getPointsFromWaypoints(data.waypoints);

  // Guard clause: Need at least 2 points to form a route
  if (points.length < 2) return null;

  const originPos = points[0];
  const destPos = points[points.length - 1];

  // Determine tooltip placement based on route direction to avoid overlapping the line
  const dLat = destPos[0] - originPos[0];
  const dLng = destPos[1] - originPos[1];
  const isVertical = Math.abs(dLat) > Math.abs(dLng);

  let direction: "top" | "bottom" | "left" | "right";
  let offset: [number, number];

  if (isVertical) {
    direction = dLat > 0 ? "bottom" : "top";
    offset = dLat > 0 ? [0, 10] : [0, -10];
  } else {
    direction = dLng > 0 ? "left" : "right";
    offset = dLng > 0 ? [-10, 0] : [10, 0];
  }

  return (
    <>
      {/* Origin Marker */}
      <Marker position={originPos} icon={createCustomIcon("origin")}>
        <Tooltip
          direction={direction}
          offset={offset}
          opacity={1}
          className="custom-tooltip"
          permanent={false}
        >
          <div className="tooltip-content">
             {/* Country Flag */}
            {data.originCountryCode && (
              <img
                src={`https://flagcdn.com/w40/${data.originCountryCode.toLowerCase()}.png`}
                alt={`${data.originCountryCode} flag`}
                className="tooltip-flag"
                style={{ display: "inline-block" }}
              />
            )}
            <div className="tooltip-company">{data.company || data.ident}</div>
            <div className="tooltip-id">{data.shipmentId || data.fa_flight_id}</div>
            <div className="tooltip-route">
              {data.origin.code} → {data.destination.code}
            </div>
          </div>
        </Tooltip>
      </Marker>

      {/* Destination Marker */}
      <Marker position={destPos} icon={createCustomIcon("origin")} />

      {/* Plane Icon (Current Position) */}
      <Marker
        position={[
          data.last_position.latitude,
          data.last_position.longitude,
        ]}
        icon={createPlaneIcon(data.last_position.heading)}
        interactive={false}
        zIndexOffset={100}
      />

      {/* Dotted Flight Path */}
      <AnimatedRoute positions={points} />
    </>
  );
};

/**
 * Main Map Component
 * Handles the MapContainer, TileLayer, and orchestrates the rendering of all shipments.
 */
const ShipmentMap = () => {
  // Collect all points from all shipments to calculate the initial map view bounds
  const allPoints: [number, number][] = [];
  shipments.forEach((s) => {
    const points = getPointsFromWaypoints(s.waypoints);
    allPoints.push(...points);
  });

  const defaultBounds = allPoints.length > 0 ? L.latLngBounds(allPoints) : L.latLngBounds([0,0], [0,0]);

  // Helper: Automatically fits the map bounds to show all shipments on load and resize
  const MapResizer = () => {
    const map = useMap();

    useEffect(() => {
      const handleResize = () => {
        map.invalidateSize();
        
        // Calculate min zoom to prevent seeing gray areas (filling the container height)
        const containerHeight = map.getSize().y;
        if (containerHeight > 0) {
            const minZoom = Math.ceil(Math.log2(containerHeight / 256));
            map.setMinZoom(minZoom);
        }
        
        // Restrict panning significantly beyond the world map
        // Expanded slightly to allow comfortable viewing of Date Line crossing routes
        map.setMaxBounds([[-90, -220], [90, 280]]); 
        
        if (allPoints.length > 0) {
            map.fitBounds(defaultBounds, { padding: [50, 50] });
        }
      };

      // Initial fit
      handleResize();
      
      // Observe container resize events
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(map.getContainer());

      return () => resizeObserver.disconnect();
    }, [map]);

    return null;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "2 / 1",
        position: "relative",
        background: "#fff",
        border: "1px solid #d1d5db",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[0, 0]}
        zoom={2}
        className="map-container"
        style={{ width: "100%", height: "100%", background: "transparent" }}
        attributionControl={false}
        // Viscosity prevents the user from dragging outside the maxBounds
        maxBoundsViscosity={1.0}
      >
        <MapResizer />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {shipments.map((shipment) => (
          <SingleShipment key={shipment.ident} data={shipment} />
        ))}
      </MapContainer>
    </div>
  );
};

export default ShipmentMap;
