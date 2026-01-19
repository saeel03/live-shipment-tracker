// src/components/AnimatedRoute/AnimatedRoute.tsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-ant-path";

interface AnimatedRouteProps {
  /** Array of [lat, lng] tuples defining the path connected points */
  positions: [number, number][];
}

/**
 * Renders an animated dotted line along the provided path positions.
 * Uses leaflet-ant-path plugin.
 */
const AnimatedRoute = ({ positions }: AnimatedRouteProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !positions || positions.length === 0) return;

    // Create the animated dotted line (Ant Path)
    // @ts-expect-error: leaflet-ant-path does not export strict types
    const antPath = L.polyline.antPath(positions, {
      delay: 1000,
      dashArray: [10, 20],
      weight: 2,
      color: "#d1d5db",
      pulseColor: "#6b7280",
      paused: false,
      reverse: false,
      hardwareAccelerated: true,
    });

    antPath.addTo(map);

    // Cleanup: Remove the layer when component unmounts or props change
    return () => {
      map.removeLayer(antPath);
    };
  }, [map, positions]);

  return null;
};

export default AnimatedRoute;
