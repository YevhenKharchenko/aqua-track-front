//import { useSelector } from 'react-redux';
//import -- selector from redux/users/selectors for dailyNormValue
//import {selectWaterPerDay} from '../../redux/selectors';

import css from './WaterProgressBar.module.css';

const WaterProgressBar = ({ currentIntake = 1500, dailyNormValue = 2000 }) => {
  //const currentIntake = useSelector(selectWaterPerDay);
  //const dailyNormValue = useSelector(selectDailyNormValue);

  const progress = (currentIntake / dailyNormValue) * 100;

  const renderPercentage = () => {
    const percentages = [];
    const result = [];

    for (let i = 0; i <= 100; i += 10) {
      if (!percentages.includes(i) && i < progress && i > progress - 10) {
        result.push(progress.toFixed(0));
      }
      if (percentages.includes(i)) {
        result.push(i);
      }
    }
    return result.map((percentage, index) => (
      <li
        key={index}
        className={parseInt(percentage, 10) === parseInt(progress, 10) ? css.exactProgressText : ''}
      >
        {percentage}%
      </li>
    ));
  };

  return (
    <div className={css.progressBarContainer}>
      <h3 className={css.progressTitle}>Today</h3>

      <div className={css.progressBar}>
        <div className={css.progressBarFill} style={{ width: `${progress}%` }}>
          <div className={css.progressIndicator}></div>
        </div>
      </div>
      <ul className={css.actualPercentage}>{renderPercentage()}</ul>
      <ul className={css.percentageList}>
        <li>0%</li>
        <li>50%</li>
        <li>100%</li>
      </ul>
    </div>
  );
};

export default WaterProgressBar;
