//import { useSelector } from 'react-redux';
//import -- selector from redux/users/selectors for dailyNormValue
//import {selectWaterPerDay} from '../../redux/selectors';

import { useState } from 'react';
import css from './WaterProgressBar.module.css';

const WaterProgressBar = ({ currentIntake = 1500, dailyNormValue = 2000 }) => {
  //const currentIntake = useSelector(selectWaterPerDay);
  //const dailyNormValue = useSelector(selectDailyNormValue);
  const [showDynamicLabel, setShowDynamicLabel] = useState(false);
  const progress = (currentIntake / dailyNormValue) * 100;

  return (
    <div className={css.progressBarContainer}>
      <h3 className={css.progressTitle}>Today</h3>

      <div
        className={css.progressBar}
        onMouseEnter={() => setShowDynamicLabel(true)}
        onMouseLeave={() => setShowDynamicLabel(false)}
      >
        <div className={css.progressBarFill} style={{ width: `${progress}%` }}>
          <div className={css.progressIndicator}></div>
        </div>
      </div>
      {showDynamicLabel && (
        <div className={css.dynamicPercentageLabel} style={{ left: `${progress}%` }}>
          {progress.toFixed(0)}%
        </div>
      )}

      <ul className={css.percentageList}>
        <li>0%</li>
        <li>50%</li>
        <li>100%</li>
      </ul>
    </div>
  );
};

export default WaterProgressBar;
