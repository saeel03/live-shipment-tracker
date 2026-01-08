import "./index.css";
import ShipmentMap from "./components/ShipmentMap";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Live Shipment Tracking</h1>

      {/* Container controls width; the map automatically maintains a 2:1 aspect ratio */}
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <ShipmentMap />
      </div>
    </div>
  );
}

export default App;
