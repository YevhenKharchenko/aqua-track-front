//import {useSelector} from 'react-redux';
//import -- selector from redux/users/selectors for dailyNormValue
import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
  const dailyNormValue = 1.5; //delete this line after adding selector

  return (
    <div className={css.dailyNormaWrapper}>
      <p className={css.normaValue}>{dailyNormValue} L</p>
      <p className={css.normaTitle}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
