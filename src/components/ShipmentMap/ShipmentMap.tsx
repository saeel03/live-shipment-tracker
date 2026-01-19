// src/components/ShipmentMap/ShipmentMap.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { shipments } from "../../data";
import type { FlightData } from "../../data";
import AnimatedRoute from "../AnimatedRoute/AnimatedRoute";
import { createCustomIcon, createPlaneIcon, getPointsFromWaypoints } from "../../utils/mapUtils";
import styles from './ShipmentMap.module.scss';

const PlanePopoverOverlay = ({
  latitude,
  longitude,
  open,
  onOpenChange,
  content,
}: {
  latitude: number;
  longitude: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: React.ReactNode;
}) => {
  const map = useMap();
  const [containerPoint, setContainerPoint] = useState<L.Point | null>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setContainerPoint(map.latLngToContainerPoint([latitude, longitude]));
      });
    };

    update();
    map.on("move", update);
    map.on("zoom", update);
    map.on("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      map.off("move", update);
      map.off("zoom", update);
      map.off("resize", update);
    };
  }, [map, latitude, longitude]);

  const mapContainer = map.getContainer();
  if (!containerPoint || !mapContainer) return null;

  return createPortal(
    <div
      style={{
        position: "absolute",
        left: containerPoint.x,
        top: containerPoint.y,
        transform: "translate(-50%, -100%)",
        zIndex: 10000,
        pointerEvents: "none",
      }}
    >
      <Popover
        open={open}
        onOpenChange={onOpenChange}
        trigger={[]}
        placement="top"
        content={content}
        overlayClassName="shipment-popover"
        getPopupContainer={() => mapContainer}
      >
        <div
          style={{
            width: 24,
            height: 24,
            background: "transparent",
            pointerEvents: "auto",
          }}
          aria-hidden="true"
        />
      </Popover>
    </div>,
    mapContainer,
  );
};

const ShipmentPopoverContent = ({ data }: { data: FlightData }) => (
  <div className="tooltip-content">
    {data.originCountryCode && (
      <img
        src={`https://flagcdn.com/w40/${data.originCountryCode.toLowerCase()}.png`}
        alt={`${data.originCountryCode} flag`}
        className="tooltip-flag"
        style={{ display: "inline-block" }}
      />
    )}
    <div className="tooltip-company">{data.company || data.ident}</div>
    <Link 
      to={`/flight/${data.shipmentId || data.fa_flight_id}`}
      className="tooltip-id-link"
    >
      {data.shipmentId || data.fa_flight_id}
    </Link>
    <div className="tooltip-route">
      {data.origin.code} → {data.destination.code}
    </div>
  </div>
);



//here input is data of one flight 
const SingleShipment = ({ data }: { data: FlightData }) => {
  // Convert raw object waypoint object into an array
  const points = getPointsFromWaypoints(data.waypoints);
  
  // Guard clause: Need at least 2 points to form a route
  if (points.length < 2) return null;

  return <SingleShipmentContent data={data} points={points} />;
};

const SingleShipmentContent = ({ 
  data, 
  points 
}: { 
  data: FlightData; 
  points: [number, number][];
}) => {
  const [isPlanePopoverOpen, setIsPlanePopoverOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const originPos = points[0]; 
  const destPos = points[points.length - 1];

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    // Small delay so moving from marker -> card doesn't close it.
    closeTimerRef.current = window.setTimeout(() => {
      setIsPlanePopoverOpen(false);
      closeTimerRef.current = null;
    }, 120);
  };

  const planeEventHandlers = useMemo(
    () => ({
      mouseover: () => {
        clearCloseTimer();
        setIsPlanePopoverOpen(true);
      },
      mouseout: () => scheduleClose(),
      click: () => {
        clearCloseTimer();
        setIsPlanePopoverOpen((prev) => !prev);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  return (
    <>
      {/* Origin Marker */}
      <Marker position={originPos} icon={createCustomIcon("origin")} />

      
      <Marker position={destPos} icon={createCustomIcon("origin")} />

      
      <Marker
        position={[
          data.last_position.latitude,
          data.last_position.longitude,
        ]}
        //plane rotates to match its heading
        icon={createPlaneIcon(data.last_position.heading)}
        eventHandlers={planeEventHandlers}
        zIndexOffset={100}
      />

      <PlanePopoverOverlay
        latitude={data.last_position.latitude}
        longitude={data.last_position.longitude}
        open={isPlanePopoverOpen}
        onOpenChange={setIsPlanePopoverOpen}
        content={
          <div
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <ShipmentPopoverContent data={data} />
          </div>
        }
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
    <div className={styles.mapWrapper}>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        className={styles.mapContainer}
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
