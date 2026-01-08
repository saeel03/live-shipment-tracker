// src/components/ShipmentMap.tsx
import { useEffect, useState } from "react";
import { MapContainer, GeoJSON, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import { shipments } from "../data";
import type { Shipment } from "../data";
import AnimatedRoute from "./AnimatedRoute";
import MapPattern from "./MapPattern";

const WORLD_BOUNDS: LatLngBoundsExpression = [
  [-90, -180],
  [90, 180],
];

// Helper: Handles map invalidation to fit container on resize
const MapResizer = () => {
  const map = useMap();

  useEffect(() => {
    const handleResize = () => {
      map.invalidateSize();
      map.fitBounds(WORLD_BOUNDS, { padding: [0, 0] });
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(map.getContainer());

    return () => resizeObserver.disconnect();
  }, [map]);

  return null;
};

// Helper: Generates custom HTML markers for Origin/Destination
const createCustomIcon = (type: "origin" | "destination") => {
  const className =
    type === "destination" ? "marker-pin-destination" : "marker-pin";

  return L.divIcon({
    className: "custom-div-icon",
    html: `<div class='${className}'></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -10],
  });
};

const ShipmentMap = () => {
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(null);
  const [geoJsonData, setGeoJsonData] = useState(null);

  // Load World GeoJSON data
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    )
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  const geoJsonStyle = {
    fillColor: "url(#dot-pattern)",
    fillOpacity: 1,
    color: "none",
    weight: 0,
  };

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "2 / 1",
        position: "relative",
        background: "#fff",
        border: "1px solid #d1d5db",
        borderRadius: "12px",
      }}
    >
      <MapPattern />

      <MapContainer
        crs={L.CRS.EPSG4326}
        center={[0, 0]}
        zoom={1}
        zoomSnap={0.01}
        className="map-container"
        style={{ width: "100%", height: "100%", background: "transparent" }}
        // Disable interactions for static dashboard view
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        touchZoom={false}
        keyboard={false}
        attributionControl={false}
      >
        <MapResizer />

        {geoJsonData && <GeoJSON data={geoJsonData} style={geoJsonStyle} />}

        {shipments.map((shipment) => {
          // Calculate tooltip position relative to the route vector
          // to ensure the card does not visually block the animated path.
          const dLat = shipment.destination[0] - shipment.origin[0];
          const dLng = shipment.destination[1] - shipment.origin[1];
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
            <Marker
              key={shipment.id}
              position={shipment.origin}
              icon={createCustomIcon("origin")}
              eventHandlers={{
                mouseover: () => setActiveShipment(shipment),
                mouseout: () => setActiveShipment(null),
              }}
            >
              <Tooltip
                direction={direction}
                offset={offset}
                opacity={1}
                className="custom-tooltip"
                permanent={false}
              >
                <div className="tooltip-content">
                  <img
                    src={`https://flagcdn.com/w80/${shipment.originCountryCode}.png`}
                    alt="flag"
                    className="tooltip-flag"
                  />
                  <div className="tooltip-company">{shipment.company}</div>
                  <div className="tooltip-id">{shipment.shipmentId}</div>
                  <div className="tooltip-route">
                    {shipment.originCode} → {shipment.destinationCode}
                  </div>
                </div>
              </Tooltip>
            </Marker>
          );
        })}

        {activeShipment && (
          <>
            <Marker
              position={activeShipment.destination}
              icon={createCustomIcon("destination")}
            />
            <AnimatedRoute
              from={activeShipment.origin}
              to={activeShipment.destination}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default ShipmentMap;
