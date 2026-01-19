import { PlaneTakeoff, PlaneLanding, Plane as PlaneIcon } from 'lucide-react';
import styles from './FlightProgressBar.module.scss';

interface FlightProgressBarProps {
  progressPercentage: number;
}

const FlightProgressBar = ({ progressPercentage }: FlightProgressBarProps) => {
  return (
    <div className={styles.customFlightProgress}>
      <div className={styles.progressTrackContainer}>
        {/* Takeoff Icon */}
        <div className={`${styles.progressIcon} ${styles.takeoffIcon}`}>
          <PlaneTakeoff size={28} strokeWidth={1.5} />
        </div>

        {/* Progress Line */}
        <div className={styles.progressLineWrapper}>
          {/* Background Dotted Line */}
          <div className={styles.progressLineBackground}></div>
          
          {/* Active Solid Line */}
          <div 
            className={styles.progressLineActive} 
            style={{ width: `${progressPercentage}%` }}
          ></div>

          {/* Moving Plane Icon */}
          <div 
            className={styles.progressPlane}
            style={{ left: `${progressPercentage}%` }}>
            <PlaneIcon size={32} fill="#7c3aed" stroke="#7c3aed" style={{ transform: 'rotate(45deg)' }} />
          </div>
        </div>

        {/* Landing Icon */}
        <div className={`${styles.progressIcon} ${styles.landingIcon}`}>
          <PlaneLanding size={28} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default FlightProgressBar;
