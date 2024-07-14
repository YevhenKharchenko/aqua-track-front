//import { useSelector } from 'react-redux';
//import { dailyNormValue } from '../components/UserSettingsForm/UserSettingsForm';
//import{currentIntake} from '../components/WaterForm/WaterForm';
import css from './WaterProgressBar.module.css';

const WaterProgressBar = ({ currentIntake = 1500, dailyNormValue = 2000 }) => {
  // Suppose we get the current consumption and daily rate from props or context

  const progress = (currentIntake / dailyNormValue) * 100;

  return (
    <div className={css.progressBarContainer}>
      <h3 className={css.progressTitle}>Today</h3>
      <div className={css.progressBar}>
        <div className={css.progressBarFill} style={{ width: `${progress}%` }}>
          <div className={css.progressIndicator} />
        </div>
      </div>
      <ul className={css.percentageList}>
        <li>0%</li>
        <li>50%</li>
        <li>100%</li>
      </ul>
    </div>
  );
};

export default WaterProgressBar;
