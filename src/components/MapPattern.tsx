const MapPattern = () => {
  return (
    // Hidden SVG to define the "dot-pattern" fill used by GeoJSON layers
    <svg style={{ height: 0, width: 0, position: "absolute" }}>
      <defs>
        <pattern
          id="dot-pattern"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="#d1d5db" />
        </pattern>
      </defs>
    </svg>
  );
};

export default MapPattern;
