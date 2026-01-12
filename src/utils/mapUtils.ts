import L from "leaflet";

/**
 * Converts a flat array of waypoints [lat1, lng1, lat2, lng2...] 
 * into an array of Leaflet-compatible tuples [[lat1, lng1], [lat2, lng2]...]
 */
export const getPointsFromWaypoints = (waypoints: number[]): [number, number][] => {
  const points: [number, number][] = [];
  for (let i = 0; i < waypoints.length; i += 2) {
    points.push([waypoints[i], waypoints[i + 1]]);
  }
  return points;
};

/**
 * Creates a custom HTML div icon for Origin or Destination markers.
 */
export const createCustomIcon = (type: "origin" | "destination") => {
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

/**
 * Creates a rotatable plane icon using SVG.
 * @param rotation Rotation in degrees (0 = North, 90 = East)
 */
export const createPlaneIcon = (rotation: number) => {
  return L.divIcon({
    className: "plane-icon",
    html: `<div style="transform: rotate(${rotation}deg); width: 24px; height: 24px;">
      <svg viewBox="0 0 24 24" fill="#3b82f6" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};
