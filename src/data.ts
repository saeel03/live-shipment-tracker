// src/data.ts

export interface Shipment {
  id: string;
  company: string;
  shipmentId: string;
  originCode: string;
  destinationCode: string;
  originCountryCode: string; // ISO 2-letter code for flag display
  origin: [number, number];
  destination: [number, number];
}

export const shipments: Shipment[] = [
  {
    id: "1",
    company: "Prestige Gold & Mineral DMCC",
    shipmentId: "SHIP-202512-1001",
    originCode: "ACC",
    destinationCode: "DXB",
    originCountryCode: "gh", // Ghana
    origin: [5.6051, -0.1657],
    destination: [25.2532, 55.3657],
  },
  {
    id: "2",
    company: "Global Tech Exports",
    shipmentId: "SHIP-202512-1045",
    originCode: "JFK",
    destinationCode: "LHR",
    originCountryCode: "us", // USA
    origin: [40.6413, -73.7781],
    destination: [51.47, -0.4543],
  },
  {
    id: "3",
    company: "Asia Pacific Logistics",
    shipmentId: "SHIP-202512-1089",
    originCode: "HND",
    destinationCode: "SYD",
    originCountryCode: "jp", // Japan
    origin: [35.5494, 139.7798],
    destination: [-33.9399, 151.1753],
  },
  {
    id: "4",
    company: "Rio Coffee Traders",
    shipmentId: "SHIP-202512-1102",
    originCode: "GRU",
    destinationCode: "MIA",
    originCountryCode: "br", // Brazil
    origin: [-23.4356, -46.4731],
    destination: [25.7959, -80.287],
  },
  {
    id: "5",
    company: "Mumbai Textiles Ltd",
    shipmentId: "SHIP-202512-1156",
    originCode: "BOM",
    destinationCode: "SIN",
    originCountryCode: "in", // India
    origin: [19.0896, 72.8656],
    destination: [1.3644, 103.9915],
  },
  {
    id: "6",
    company: "Berlin Automotive Group",
    shipmentId: "SHIP-202512-1201",
    originCode: "BER",
    destinationCode: "PVG",
    originCountryCode: "de", // Germany
    origin: [52.3667, 13.5033],
    destination: [31.1443, 121.8083],
  },
  {
    id: "7",
    company: "Cape Fresh Produce",
    shipmentId: "SHIP-202512-1244",
    originCode: "CPT",
    destinationCode: "AMS",
    originCountryCode: "za", // South Africa
    origin: [-33.9715, 18.6021],
    destination: [52.3105, 4.7683],
  },
];
