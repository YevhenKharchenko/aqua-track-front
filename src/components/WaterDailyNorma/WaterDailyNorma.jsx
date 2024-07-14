import css from './WaterDailyNorma.module.css';
//import {dailyNormValue} from '../components/UsersettingsForm/UserSettingsForm';

const WaterDailyNorma = () => {
  const dailyNormValue = 1.5; //delete this line after adding proper component data

  return (
    <div className={css.dailyNormaWrapper}>
      <p className={css.normaValue}>{dailyNormValue} L</p>
      <p className={css.normaTitle}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
