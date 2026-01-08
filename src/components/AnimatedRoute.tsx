import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-ant-path";

interface AnimatedRouteProps {
  from: [number, number];
  to: [number, number];
}

const AnimatedRoute = ({ from, to }: AnimatedRouteProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !from || !to) return;

    // Create the animated dotted line (Ant Path)
    // @ts-ignore: leaflet-ant-path does not export strict types
    const antPath = L.polyline.antPath([from, to], {
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

    return () => {
      map.removeLayer(antPath);
    };
  }, [map, from, to]);

  return null;
};

export default AnimatedRoute;
