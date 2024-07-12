//import currentIntake
//import dailyNormValue
import css from './WaterProgressBar.module.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

const WaterProgressBar = () => {
  // Suppose we get the current consumption and daily rate from props or context
  let currentIntake; //example: 1000ml
  let dailyNormValue; // example: 2000ml

  const progress = (currentIntake / dailyNormValue) * 100;

  return (
    <div className={css.progressBarContainer}>
      <h3 className={css.progressTitle}>Today</h3>
      <ProgressBar className={css.progressBar} now={progress} />
      <div className={css.percentage}>
        <ul>
          <li>0%</li>
          <li>50%</li>
          <li>100%</li>
        </ul>
      </div>
    </div>
  );
};

export default WaterProgressBar;
