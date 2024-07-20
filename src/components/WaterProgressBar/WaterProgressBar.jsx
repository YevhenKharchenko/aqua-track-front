import { useSelector } from 'react-redux';
import { useState } from 'react';

import { selectWaterPerDayArr, selectWaterNorma } from '../../redux/selectors.js';
import { calculateFeasibility } from '../../helpers/calculateFeasibility.js';

import css from './WaterProgressBar.module.css';

const WaterProgressBar = ({ currentIntake, dailyNorm }) => {
  //const currentIntake = useSelector(selectWaterPerDay);
  //const dailyNormValue = useSelector(selectDailyNormValue);
  const [showDynamicLabel, setShowDynamicLabel] = useState(false);
  // const progress = (currentIntake / dailyNorm) * 100;

  const waterPerDay = useSelector(selectWaterPerDayArr);
  const dailyNorma = useSelector(selectWaterNorma);

  const feasibility = calculateFeasibility(waterPerDay, dailyNorma);

  return (
    <div className={css.progressBarContainer}>
      <h3 className={css.progressTitle}>Today</h3>

      <div
        className={css.progressBar}
        onMouseEnter={() => setShowDynamicLabel(true)}
        onMouseLeave={() => setShowDynamicLabel(false)}
      >
        <div className={css.progressBarFill} style={{ width: `${feasibility}%` }}>
          <div className={css.progressIndicator}></div>
        </div>
      </div>
      {showDynamicLabel && (
        <div className={css.dynamicPercentageLabel} style={{ left: `${feasibility}%` }}>
          {feasibility.toFixed(0)}%
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
