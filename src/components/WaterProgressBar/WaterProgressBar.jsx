//import currentIntake
//import dailyNormValue
import css from './WaterProgressBar.module.css';
import { Line } from 'react-progressbar.js';

const WaterProgressBar = ({ currentIntake, dailyNormValue }) => {
  const progress = (currentIntake / dailyNormValue) * 100;

  const options = {
    color: '#9BE1A0',
    strokeWidth: 9,
    trailColor: '#e0e0e0',
    trailWidth: 9,
  };

  return (
    <div className={css.progressBarContainer}>
      <h3 className={css.progressTitle}>Today</h3>
      <Line progress={progress / 100} options={options} initialAnimate={true} />
      <ul className={css.percentageList}>
        <li>0%</li>
        <li>50%</li>
        <li>100%</li>
      </ul>
    </div>
  );
};

export default WaterProgressBar;
