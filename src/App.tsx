import { Routes, Route } from "react-router-dom";
import "./index.css";
import ShipmentMap from "./components/ShipmentMap";
import FlightDetails from "./components/FlightDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div style={{ padding: "20px" }}>
          <h1>Live Shipment Tracking</h1>
          {/* Container controls width; the map automatically maintains a 2:1 aspect ratio */}
          <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
            <ShipmentMap />
          </div>
        </div>
      } />
      <Route path="/flight/:flightId" element={<FlightDetails />} />
    </Routes>
  );
}

export default App;
