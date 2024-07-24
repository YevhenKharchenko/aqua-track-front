import { useSelector } from 'react-redux';
import { selectWaterNorma } from '../../redux/selectors.js';
import { useTour } from '@reactour/tour';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import Logo from '../Logo/Logo';
import sprite from '../../assets/icons/sprite.svg';
import css from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  const { setIsOpen } = useTour();
  const dailyNorma = useSelector(selectWaterNorma) || 1.5;

  return (
    <div className={css.infoContainer}>
      <button className={css.startTourBtn} onClick={() => setIsOpen(true)}>
        Start tour
      </button>
      <Logo className={css.logoContainer} />
      <WaterDailyNorma className={css.dailyNormaContainer} dailyNorm={dailyNorma} />
      <WaterProgressBar className={css.progressBarContainer} dailyNorm={dailyNorma} />
      <AddWaterBtn className={css.addWaterBtn} icon={`${sprite}#icon-plus16x16`} />
    </div>
  );
};

export default WaterMainInfo;
