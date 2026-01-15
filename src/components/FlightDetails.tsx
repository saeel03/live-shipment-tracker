import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PlaneTakeoff, PlaneLanding, Plane as PlaneIcon } from 'lucide-react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { shipments } from '../data';
import type { FlightData } from '../data';
import './FlightDetails.css';

const FlightDetails = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const navigate = useNavigate();

  // Find the flight data
  const flight: FlightData | undefined = shipments.find(
    (s) => s.fa_flight_id === flightId || s.shipmentId === flightId
  );

  if (!flight) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Flight not found</h2>
        <Button type="primary" onClick={() => navigate('/')}>
          Back to Map
        </Button>
      </div>
    );
  }

  // Parse dates
  const departureDate = new Date(flight.actual_off);
  const arrivalDate = flight.actual_on
    ? new Date(flight.actual_on)
    : flight.predicted_on
      ? new Date(flight.predicted_on)
      : flight.predicted_in
        ? new Date(flight.predicted_in)
        : null;
  const hasLanded = Boolean(flight.actual_on);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).toUpperCase();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).toUpperCase();
  };

  const calculateTimeDifference = (from: Date, to: Date) => {
    const diff = to.getTime() - from.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // Determine flight status and progress
  const now = new Date();
  
  let progressPercentage = 0;
  if (departureDate && arrivalDate) {
    const totalDuration = arrivalDate.getTime() - departureDate.getTime();
    const elapsed = now.getTime() - departureDate.getTime();
    
    if (totalDuration <= 0) {
      progressPercentage = 0;
    } else if (elapsed <= 0) {
      progressPercentage = 0;
    } else {
      const rawProgress = (elapsed / totalDuration) * 100;
      // If the flight has not actually landed yet, never show 100%.
      progressPercentage = hasLanded ? rawProgress : Math.min(rawProgress, 95);
      if (progressPercentage > 100) progressPercentage = 100;
      if (progressPercentage < 0) progressPercentage = 0;
    }
  }

  return (
    <div className="flight-details-container">
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/')}
        style={{ marginBottom: '20px' }}
      >
        Back to Map
      </Button>

      <div className="flight-card">
        {/* Header */}
        <div className="flight-header">
          <h1 className="flight-title">
            {flight.company || flight.ident}
          </h1>
          <p className="flight-awb">AWB No. {flight.shipmentId || flight.fa_flight_id}</p>
        </div>

        {/* Gate and Terminal Info */}
        <div className="flight-terminals">
          <div className="terminal-info">
            <div className="terminal-label">
              {flight.origin.terminal && flight.origin.gate 
                ? `${flight.origin.terminal} ${flight.origin.gate}`
                : flight.origin.terminal || 'Departure Terminal'}
            </div>
            <div className="airport-name">
              {flight.origin.name} - <span className="airport-code">{flight.origin.code_iata || flight.origin.code}</span>
            </div>
            <div className="flight-date">{formatDate(departureDate)}</div>
            <div className="flight-time">
              {formatTime(departureDate)}
              <span className="time-status"> (12 minutes early)</span>
            </div>
          </div>

          <div className="terminal-info terminal-right">
            <div className="terminal-label">
              arriving at {flight.destination.terminal || 'Arrival Terminal'}
            </div>
            <div className="airport-name">
              {flight.destination.name} - <span className="airport-code">{flight.destination.code_iata || flight.destination.code}</span>
            </div>
            {arrivalDate && (
              <>
                <div className="flight-date">{formatDate(arrivalDate)}</div>
                <div className="flight-time">
                  {formatTime(arrivalDate)}
                  <span className="time-status">{hasLanded ? ' (12 minutes early)' : ' (estimated)'}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Flight Progress */}
        <div className="flight-progress">
          <div className="progress-cities">
            <div className="city-block">
              <div className="city-label">
                {flight.origin.city.toUpperCase()}, {flight.origin.country}
              </div>
              <div className="city-code">{flight.origin.code_iata || flight.origin.code}</div>
            </div>
            <div className="flight-duration">
              {arrivalDate && calculateTimeDifference(departureDate, arrivalDate)}
            </div>
            <div className="city-block city-right">
              <div className="city-label">
                {flight.destination.city.toUpperCase()}, {flight.destination.country}
              </div>
              <div className="city-code">{flight.destination.code_iata || flight.destination.code}</div>
            </div>
          </div>

          {/* Flight Progress Bar */}
          <div className="custom-flight-progress">
            <div className="progress-track-container">
              {/* Takeoff Icon */}
              <div className="progress-icon takeoff-icon">
                <PlaneTakeoff size={28} strokeWidth={1.5} />
              </div>

              {/* Progress Line */}
              <div className="progress-line-wrapper">
                {/* Background Dotted Line */}
                <div className="progress-line-background"></div>
                
                {/* Active Solid Line */}
                <div 
                  className="progress-line-active" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>

                {/* Moving Plane Icon */}
                <div 
                  className="progress-plane"
                  style={{ left: `${progressPercentage}%` }}
                >
                  <PlaneIcon size={32} fill="#7c3aed" stroke="#7c3aed" style={{ transform: 'rotate(45deg)' }} />
                </div>
              </div>

              {/* Landing Icon */}
              <div className="progress-icon landing-icon">
                <PlaneLanding size={28} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
