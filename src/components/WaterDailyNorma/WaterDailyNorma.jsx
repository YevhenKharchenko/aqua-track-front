import { useSelector } from 'react-redux';
import css from './WaterDailyNorma.module.css';
import { selectWaterPerDay } from '../../redux/selectors';

const WaterDailyNorma = () => {
  //const dailyNormValue = useSelector(selectWaterPerDay);
  const dailyNormValue = 1.5;

  return (
    <div className={css.dailyNormaWrapper}>
      <p className={css.normaValue}>{dailyNormValue} L</p>
      <p className={css.normaTitle}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
