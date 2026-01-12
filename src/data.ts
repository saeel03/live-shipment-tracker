export interface AirportInfo {
  code: string;
  code_icao: string;
  code_iata: string;
  code_lid: string | null;
  timezone: string;
  name: string;
  city: string;
  airport_info_url: string;
}

export interface Position {
  fa_flight_id: string;
  altitude: number;
  altitude_change: string;
  groundspeed: number;
  heading: number;
  latitude: number;
  longitude: number;
  timestamp: string;
  update_type: string;
}

export interface FlightData {
  ident: string;
  ident_icao: string;
  ident_iata: string;
  fa_flight_id: string;
  // User custom fields
  company?: string;
  shipmentId?: string;
  originCountryCode: string;
  
  actual_off: string;
  actual_on: string | null;
  foresight_predictions_available: boolean;
  predicted_out: string | null;
  predicted_off: string | null;
  predicted_on: string | null;
  predicted_in: string | null;
  predicted_out_source: string | null;
  predicted_off_source: string | null;
  predicted_on_source: string | null;
  predicted_in_source: string | null;
  origin: AirportInfo;
  destination: AirportInfo;
  waypoints: number[];
  first_position_time: string;
  last_position: Position;
  bounding_box: [number, number, number, number];
  ident_prefix: string | null;
  aircraft_type: string;
}

export const shipments: FlightData[] = [
  {
    "ident": "SHIP-1001",
    "ident_icao": "PGM1001",
    "ident_iata": "PG1001",
    "fa_flight_id": "SHIP-202512-1001",
    "company": "Prestige Gold & Mineral DMCC",
    "shipmentId": "SHIP-202512-1001",
    "originCountryCode": "gh",
    "actual_off": "2026-01-07T08:00:00Z",
    "actual_on": null,
    "foresight_predictions_available": true,
    "predicted_out": null,
    "predicted_off": null,
    "predicted_on": null,
    "predicted_in": null,
    "predicted_out_source": null,
    "predicted_off_source": null,
    "predicted_on_source": null,
    "predicted_in_source": null,
    "origin": {
      "code": "ACC",
      "code_icao": "DGAA",
      "code_iata": "ACC",
      "code_lid": "ACC",
      "timezone": "Africa/Accra",
      "name": "Kotoka Int'l",
      "city": "Accra",
      "airport_info_url": "#"
    },
    "destination": {
      "code": "DXB",
      "code_icao": "OMDB",
      "code_iata": "DXB",
      "code_lid": null,
      "timezone": "Asia/Dubai",
      "name": "Dubai Int'l",
      "city": "Dubai",
      "airport_info_url": "#"
    },
    "waypoints": [
      5.6051, -0.1657,
      8.5, 4.0,
      11.0, 10.0,
      13.5, 18.0,
      15.0, 25.0,
      16.0, 32.0,
      18.5, 38.0,
      21.0, 45.0,
      23.5, 50.0,
      24.5, 53.0,
      25.2532, 55.3657
    ],
    "first_position_time": "2026-01-07T08:00:00Z",
    "last_position": {
      "fa_flight_id": "SHIP-202512-1001-tracking",
      "altitude": 350,
      "altitude_change": "-",
      "groundspeed": 495,
      "heading": 65,
      "latitude": 16.0,
      "longitude": 32.0,
      "timestamp": "2026-01-07T12:00:00Z",
      "update_type": "P"
    },
    "bounding_box": [
      5.6051, -0.1657,
      25.2532, 55.3657
    ],
    "ident_prefix": null,
    "aircraft_type": "B748"
  },
  {
    "ident": "SHIP-1002",
    "ident_icao": "GL1002",
    "ident_iata": "GL1002",
    "fa_flight_id": "SHIP-202512-1002",
    "company": "Global Logistics Corp",
    "shipmentId": "SHIP-202512-1002",
    "originCountryCode": "cn",
    "actual_off": "2026-01-07T09:00:00Z",
    "actual_on": null,
    "foresight_predictions_available": true,
    "predicted_out": null,
    "predicted_off": null,
    "predicted_on": null,
    "predicted_in": null,
    "predicted_out_source": null,
    "predicted_off_source": null,
    "predicted_on_source": null,
    "predicted_in_source": null,
    "origin": {
      "code": "PVG",
      "code_icao": "ZSPD",
      "code_iata": "PVG",
      "code_lid": null,
      "timezone": "Asia/Shanghai",
      "name": "Shanghai Pudong Int'l",
      "city": "Shanghai",
      "airport_info_url": "#"
    },
    "destination": {
      "code": "LAX",
      "code_icao": "KLAX",
      "code_iata": "LAX",
      "code_lid": "LAX",
      "timezone": "America/Los_Angeles",
      "name": "Los Angeles Int'l",
      "city": "Los Angeles",
      "airport_info_url": "#"
    },
    // Note: Longitudes > 180 or < -180 are used to permit continuous rendering across the International Date Line
    // e.g. 195.0 is equivalent to -165.0 (195 - 360)
    "waypoints": [
      31.1443, 121.8083,
      35.0, 145.0,
      40.0, 170.0,
      45.0, 195.0,
      42.0, 220.0,
      33.9416, 241.5915
    ],
    "first_position_time": "2026-01-07T09:00:00Z",
    "last_position": {
      "fa_flight_id": "SHIP-202512-1002-tracking",
      "altitude": 380,
      "altitude_change": "-",
      "groundspeed": 520,
      "heading": 100,
      "latitude": 45.0,
      "longitude": 195.0, 
      "timestamp": "2026-01-07T14:00:00Z",
      "update_type": "P"
    },
    "bounding_box": [
      31.1443, 121.8083,
      45.0, 241.5915
    ],
    "ident_prefix": null,
    "aircraft_type": "B77W"
  },
  {
    "ident": "SHIP-1003",
    "ident_icao": "TC1003",
    "ident_iata": "TC1003",
    "fa_flight_id": "SHIP-202512-1003",
    "company": "TransAtlantic Cargo",
    "shipmentId": "SHIP-202512-1003",
    "originCountryCode": "us",
    "actual_off": "2026-01-07T10:00:00Z",
    "actual_on": null,
    "foresight_predictions_available": true,
    "predicted_out": null,
    "predicted_off": null,
    "predicted_on": null,
    "predicted_in": null,
    "predicted_out_source": null,
    "predicted_off_source": null,
    "predicted_on_source": null,
    "predicted_in_source": null,
    "origin": {
      "code": "JFK",
      "code_icao": "KJFK",
      "code_iata": "JFK",
      "code_lid": "JFK",
      "timezone": "America/New_York",
      "name": "John F. Kennedy Int'l",
      "city": "New York",
      "airport_info_url": "#"
    },
    "destination": {
      "code": "LHR",
      "code_icao": "EGLL",
      "code_iata": "LHR",
      "code_lid": null,
      "timezone": "Europe/London",
      "name": "Heathrow",
      "city": "London",
      "airport_info_url": "#"
    },
    "waypoints": [
      40.6413, -73.7781,
      44.0, -60.0,
      48.0, -45.0,
      51.0, -30.0,
      52.0, -15.0,
      51.4700, -0.4543
    ],
    "first_position_time": "2026-01-07T10:00:00Z",
    "last_position": {
      "fa_flight_id": "SHIP-202512-1003-tracking",
      "altitude": 360,
      "altitude_change": "-",
      "groundspeed": 480,
      "heading": 85,
      "latitude": 51.0,
      "longitude": -30.0,
      "timestamp": "2026-01-07T13:00:00Z",
      "update_type": "P"
    },
    "bounding_box": [
      40.6413, -73.7781,
      52.0, -0.4543
    ],
    "ident_prefix": null,
    "aircraft_type": "A359"
  }
];
