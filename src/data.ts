export interface AirportInfo {
  code: string;
  code_icao: string;
  code_iata: string;
  code_lid: string | null;
  timezone: string;
  name: string;
  city: string;
  country: string;
  airport_info_url: string;
  terminal?: string;
  gate?: string;
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
    "ident": "EK 788",
    "ident_icao": "UAE788",
    "ident_iata": "EK788",
    "fa_flight_id": "EK788-202512170215",
    "company": "Emirates SkyCargo (EK 788)",
    "shipmentId": "398-989-348",
    "originCountryCode": "qa",
    "actual_off": "2026-01-15T02:15:00Z",
    "actual_on": null,
    "foresight_predictions_available": true,
    "predicted_out": null,
    "predicted_off": null,
    "predicted_on": "2026-01-15T09:50:00Z",
    "predicted_in": null,
    "predicted_out_source": null,
    "predicted_off_source": null,
    "predicted_on_source": null,
    "predicted_in_source": null,
    "origin": {
      "code": "DOH",
      "code_icao": "OTHH",
      "code_iata": "DOH",
      "code_lid": null,
      "timezone": "Asia/Qatar",
      "name": "Hamad Int'l",
      "city": "Doha",
      "country": "QATAR",
      "airport_info_url": "#",
      "terminal": "Terminal 3",
      "gate": "GATE D4"
    },
    "destination": {
      "code": "LIS",
      "code_icao": "LPPT",
      "code_iata": "LIS",
      "code_lid": null,
      "timezone": "Europe/Lisbon",
      "name": "General Humberto Delgado Airport",
      "city": "Lisbon",
      "country": "PORTUGAL",
      "airport_info_url": "#",
      "terminal": "TERMINAL 1"
    },
    "waypoints": [
      25.2732, 51.6081,
      27.0, 45.0,
      29.0, 38.0,
      31.0, 30.0,
      33.0, 22.0,
      35.0, 14.0,
      36.5, 6.0,
      37.5, -2.0,
      38.5, -6.0,
      38.7756, -9.1354
    ],
    "first_position_time": "2026-01-15T02:15:00Z",
    "last_position": {
      "fa_flight_id": "EK788-202512170215-tracking",
      "altitude": 380,
      "altitude_change": "-",
      "groundspeed": 510,
      "heading": 285,
      "latitude": 35.0,
      "longitude": 14.0,
      "timestamp": "2026-01-15T05:10:00Z",
      "update_type": "P"
    },
    "bounding_box": [
      25.2732, 51.6081,
      38.7756, -9.1354
    ],
    "ident_prefix": "EK",
    "aircraft_type": "B77F"
  },
  {
    "ident": "CA 987",
    "ident_icao": "CCA987",
    "ident_iata": "CA987",
    "fa_flight_id": "CA987-202601081230",
    "company": "Air China Cargo (CA 987)",
    "shipmentId": "567-234-891",
    "originCountryCode": "cn",
    "actual_off": "2026-01-15T03:10:00Z",
    "actual_on": null,
    "foresight_predictions_available": true,
    "predicted_out": null,
    "predicted_off": null,
    "predicted_on": "2026-01-15T14:40:00Z",
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
      "country": "CHINA",
      "airport_info_url": "#",
      "terminal": "Terminal 2",
      "gate": "GATE W201"
    },
    "destination": {
      "code": "LAX",
      "code_icao": "KLAX",
      "code_iata": "LAX",
      "code_lid": "LAX",
      "timezone": "America/Los_Angeles",
      "name": "Los Angeles Int'l",
      "city": "Los Angeles",
      "country": "UNITED STATES",
      "airport_info_url": "#",
      "terminal": "TERMINAL B"
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
    "first_position_time": "2026-01-15T03:10:00Z",
    "last_position": {
      "fa_flight_id": "CA987-202601081230-tracking",
      "altitude": 380,
      "altitude_change": "-",
      "groundspeed": 520,
      "heading": 100,
      "latitude": 45.0,
      "longitude": 195.0, 
      "timestamp": "2026-01-15T09:00:00Z",
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
    "ident": "BA 178",
    "ident_icao": "BAW178",
    "ident_iata": "BA178",
    "fa_flight_id": "BA178-202601091830",
    "company": "British Airways Cargo (BA 178)",
    "shipmentId": "742-158-963",
    "originCountryCode": "us",
    "actual_off": "2026-01-16T05:00:00Z",
    "actual_on": null,
    "foresight_predictions_available": true,
    "predicted_out": null,
    "predicted_off": null,
    "predicted_on": "2026-01-16T12:00:00Z",
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
      "country": "UNITED STATES",
      "airport_info_url": "#",
      "terminal": "Terminal 7",
      "gate": "GATE 2"
    },
    "destination": {
      "code": "LHR",
      "code_icao": "EGLL",
      "code_iata": "LHR",
      "code_lid": null,
      "timezone": "Europe/London",
      "name": "Heathrow",
      "city": "London",
      "country": "UNITED KINGDOM",
      "airport_info_url": "#",
      "terminal": "TERMINAL 5"
    },
    "waypoints": [
      40.6413, -73.7781,
      44.0, -60.0,
      48.0, -45.0,
      51.0, -30.0,
      52.0, -15.0,
      51.4700, -0.4543
    ],
    "first_position_time": "2026-01-16T05:00:00Z",
    "last_position": {
      "fa_flight_id": "BA178-202601091830-tracking",
      "altitude": 360,
      "altitude_change": "-",
      "groundspeed": 480,
      "heading": 85,
      "latitude": 51.0,
      "longitude": -30.0,
      "timestamp": "2026-01-15T10:00:00Z",
      "update_type": "P"
    },
    "bounding_box": [
      40.6413, -73.7781,
      52.0, -0.4543
    ],
    "ident_prefix": null,
    "aircraft_type": "A359"
  },
  {
    "ident": "SHIP-1001",
    "ident_icao": "PGM1001",
    "ident_iata": "PG1001",
    "fa_flight_id": "SHIP-202512-1001",
    "company": "Prestige Gold & Mineral DMCC",
    "shipmentId": "SHIP-202512-1001",
    "originCountryCode": "gh",
    "actual_off": "2026-01-15T08:00:00Z",
    "actual_on": null,
    "foresight_predictions_available": true,
    "predicted_out": null,
    "predicted_off": null,
    "predicted_on": "2026-01-15T16:10:00Z",
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
      "country": "GHANA",
      "airport_info_url": "#",
      "terminal": "Terminal 3",
      "gate": "GATE A6"
    },
    "destination": {
      "code": "DXB",
      "code_icao": "OMDB",
      "code_iata": "DXB",
      "code_lid": null,
      "timezone": "Asia/Dubai",
      "name": "Dubai Int'l",
      "city": "Dubai",
      "country": "UNITED ARAB EMIRATES",
      "airport_info_url": "#",
      "terminal": "TERMINAL 1"
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
    "first_position_time": "2026-01-15T08:00:00Z",
    "last_position": {
      "fa_flight_id": "SHIP-202512-1001-tracking",
      "altitude": 350,
      "altitude_change": "-",
      "groundspeed": 495,
      "heading": 65,
      "latitude": 16.0,
      "longitude": 32.0,
      "timestamp": "2026-01-15T12:00:00Z",
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
    "ident": "LH 8103",
    "ident_icao": "DLH8103",
    "ident_iata": "LH8103",
    "fa_flight_id": "LH8103-202601160900",
    "company": "Lufthansa Cargo (LH 8103)",
    "shipmentId": "923-456-712",
    "originCountryCode": "de",
    "actual_off": "2026-01-16T04:00:00Z",
    "actual_on": null,
    "foresight_predictions_available": true,
    "predicted_out": null,
    "predicted_off": null,
    "predicted_on": "2026-01-16T14:00:00Z",
    "predicted_in": null,
    "predicted_out_source": null,
    "predicted_off_source": null,
    "predicted_on_source": null,
    "predicted_in_source": null,
    "origin": {
      "code": "FRA",
      "code_icao": "EDDF",
      "code_iata": "FRA",
      "code_lid": null,
      "timezone": "Europe/Berlin",
      "name": "Frankfurt Int'l",
      "city": "Frankfurt",
      "country": "GERMANY",
      "airport_info_url": "#",
      "terminal": "Terminal 2",
      "gate": "GATE D12"
    },
    "destination": {
      "code": "NRT",
      "code_icao": "RJAA",
      "code_iata": "NRT",
      "code_lid": null,
      "timezone": "Asia/Tokyo",
      "name": "Narita Int'l",
      "city": "Tokyo",
      "country": "JAPAN",
      "airport_info_url": "#",
      "terminal": "TERMINAL 1"
    },
    "waypoints": [
      50.0379, 8.5622,
      52.0, 15.0,
      54.0, 25.0,
      56.0, 40.0,
      57.0, 55.0,
      56.0, 70.0,
      54.0, 85.0,
      52.0, 100.0,
      48.0, 115.0,
      42.0, 130.0,
      35.7647, 140.3864
    ],
    "first_position_time": "2026-01-16T04:00:00Z",
    "last_position": {
      "fa_flight_id": "LH8103-202601160900-tracking",
      "altitude": 390,
      "altitude_change": "-",
      "groundspeed": 525,
      "heading": 75,
      "latitude": 54.0,
      "longitude": 25.0,
      "timestamp": "2026-01-16T06:30:00Z",
      "update_type": "P"
    },
    "bounding_box": [
      35.7647, 8.5622,
      57.0, 140.3864
    ],
    "ident_prefix": "LH",
    "aircraft_type": "B77F"
  }



];
