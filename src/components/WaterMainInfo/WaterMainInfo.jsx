import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import Logo from '../Logo/Logo';
import css from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  return (
    <div className={css.infoContainer}>
      <Logo />
      <WaterDailyNorma className={css.dailyNormaContainer} />
      <WaterProgressBar className={css.progressBarContainer} />
      <AddWaterBtn className={css.addWaterBtn} />
    </div>
  );
};

export default WaterMainInfo;
