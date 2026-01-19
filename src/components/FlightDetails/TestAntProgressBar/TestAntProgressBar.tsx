import { Progress } from 'antd';
import { PlaneTakeoff, PlaneLanding, Plane as PlaneIcon } from 'lucide-react';
import styles from './TestAntProgressBar.module.scss';

interface TestAntProgressBarProps {
  progressPercentage: number;
}

const TestAntProgressBar = ({ progressPercentage }: TestAntProgressBarProps) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.iconWrapper}>
        {/* Takeoff Icon */}
        <div className={styles.takeoffIcon}>
          <PlaneTakeoff size={28} strokeWidth={1.5} />
        </div>

  
        <div className={styles.progressWrapper}>
          <Progress
            percent={progressPercentage}
            strokeColor="#7c3aed"
            railColor="#D3D3D3"
            status="active"
            showInfo={false}
            strokeWidth={2}
            className={styles.antProgress}
          />
          
          {/* Moving Plane Icon */}
          <div 
            className={styles.planeIcon}
            style={{ left: `${progressPercentage}%` }}
          >
            <PlaneIcon size={32} fill="#7c3aed" stroke="#7c3aed" strokeWidth={0} style={{ transform: 'rotate(45deg)' }} />
          </div>
        </div>

        {/* Landing Icon */}
        <div className={styles.landingIcon}>
          <PlaneLanding size={28} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default TestAntProgressBar;
