import { useSelector } from 'react-redux';
import { selectWaterNorma } from '../../redux/selectors.js';

import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import Logo from '../Logo/Logo';
// import Container from '../../shared/components/Container/Container';
import sprite from '../../assets/icons/sprite.svg';
import css from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  const dailyNorma = useSelector(selectWaterNorma);

  return (
    <div className={css.infoContainer}>
      <Logo className={css.logoContainer} />
      <WaterDailyNorma className={css.dailyNormaContainer} dailyNorm={dailyNorma} />
      <WaterProgressBar className={css.progressBarContainer} dailyNorm={dailyNorma} />
      <AddWaterBtn className={css.addWaterBtn} icon={`${sprite}#icon-plus16x16`} />
    </div>
  );
};

export default WaterMainInfo;
