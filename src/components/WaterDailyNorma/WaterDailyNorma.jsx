import css from './WaterDailyNorma.module.css';
//import dailyNormValue!!!!
const WaterDailyNorma = () => {
  let dailyNormValue = 1.5; // need import from setting modal

  return (
    <div className={css.normaContainer}>
      <p className={css.normaValue}>{dailyNormValue} L</p>
      <p className={css.normaTitle}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
