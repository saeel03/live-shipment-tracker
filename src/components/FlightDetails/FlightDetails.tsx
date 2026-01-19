import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { shipments } from '../../data';
import type { FlightData } from '../../data';
// import FlightProgressBar from './FlightProgressBar/FlightProgressBar';
import TestAntProgressBar from './TestAntProgressBar/TestAntProgressBar';
import styles from './FlightDetails.module.scss';

const FlightDetails = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const navigate = useNavigate();

  // Find the correct flight data
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

  const departureDate = new Date(flight.actual_off); //flight start time
  let arrivalDate: Date | null = null;
  if (flight.actual_on) {
    arrivalDate = new Date(flight.actual_on); // arrival date
  } else if (flight.predicted_on) { //Incase: flight still flying
    arrivalDate = new Date(flight.predicted_on);
  } else if (flight.predicted_in) {
    arrivalDate = new Date(flight.predicted_in);
  }
  const hasLanded = Boolean(flight.actual_on);//true or false

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
    const diff = to.getTime() - from.getTime(); //getTime return time in millisecond
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // Determine flight status and progress
  const now = new Date();
  
  let progressPercentage = 0;
  
  if (departureDate && arrivalDate) {
    const totalDuration = arrivalDate.getTime() - departureDate.getTime(); //total duration
    const elapsed = now.getTime() - departureDate.getTime(); //time has passed since take off
    
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
    <div className={styles.flightDetailsContainer}>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/')}
        style={{ marginBottom: '20px' }}
      >
        Back to Map
      </Button>

      <Card className={styles.flightCard} bordered={false}>
        {/* Header */}
        <div className={styles.flightHeader}>
          <h1 className={styles.flightTitle}>
            {flight.company || flight.ident}
          </h1>
          <p className={styles.flightAwb}>AWB No. {flight.shipmentId || flight.fa_flight_id}</p>
        </div>

        {/* Gate and Terminal Info */}
        <div className={styles.flightTerminals}>
          <div className={styles.terminalInfo}>
            <div className={styles.terminalLabel}>
              {flight.origin.terminal && flight.origin.gate 
                ? `${flight.origin.terminal} ${flight.origin.gate}`
                : flight.origin.terminal || 'Departure Terminal'}
            </div>
            <div className={styles.airportName}>
              {flight.origin.name} - <span className={styles.airportCode}>{flight.origin.code_iata || flight.origin.code}</span>
            </div>
            <div className={styles.flightDate}>{formatDate(departureDate)}</div>
            <div className={styles.flightTime}>
              {formatTime(departureDate)}
              <span className={styles.timeStatus}> (12 minutes early)</span>
            </div>
          </div>

          {/* right info */}
          <div className={`${styles.terminalInfo} ${styles.terminalRight}`}>
            <div className={styles.terminalLabel}>
              arriving at {flight.destination.terminal || 'Arrival Terminal'}
            </div>
            <div className={styles.airportName}>
              {flight.destination.name} - <span className={styles.airportCode}>{flight.destination.code_iata || flight.destination.code}</span>
            </div>
            {arrivalDate && (
              <>
                <div className={styles.flightDate}>{formatDate(arrivalDate)}</div>
                <div className={styles.flightTime}>
                  {formatTime(arrivalDate)}
                  <span className={styles.timeStatus}>{hasLanded ? ' (12 minutes early)' : ' (estimated)'}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Flight Progress */}
        <div className={styles.flightProgress}>
          <div className={styles.progressCities}>
            <div className={styles.cityBlock}>
              <div className={styles.cityLabel}>
                {flight.origin.city.toUpperCase()}, {flight.origin.country}
              </div>
              <div className={styles.cityCode}>{flight.origin.code_iata || flight.origin.code}</div>
            </div>
            <div className={styles.flightDuration}>
              {arrivalDate && calculateTimeDifference(departureDate, arrivalDate)}
            </div>
            <div className={`${styles.cityBlock} ${styles.cityRight}`}>
              <div className={styles.cityLabel}>
                {flight.destination.city.toUpperCase()}, {flight.destination.country}
              </div>
              <div className={styles.cityCode}>{flight.destination.code_iata || flight.destination.code}</div>
            </div>
          </div>

          {/* Flight Progress Bar - Original */}
          {/* <FlightProgressBar progressPercentage={progressPercentage} /> */}
          
          {/* Flight Progress Bar - Ant Design Test */}
          {/* <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px dashed #e5e7eb' }}> */}
            <TestAntProgressBar progressPercentage={progressPercentage} />
          </div>
        {/* </div> */}
      </Card>
    </div>
  );
};

export default FlightDetails;
