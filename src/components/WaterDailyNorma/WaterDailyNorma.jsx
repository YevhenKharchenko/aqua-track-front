//import {useSelector} from 'react-redux';
//import -- selector from redux/users/selectors for dailyNormValue
import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = ({ dailyNorm }) => {
  return (
    <div className={css.dailyNormaWrapper}>
      <p className={css.normaValue}>{dailyNorm} L</p>
      <p className={css.normaTitle}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
