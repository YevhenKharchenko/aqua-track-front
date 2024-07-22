//import {useSelector} from 'react-redux';
//import -- selector from redux/users/selectors for dailyNormValue
import css from './WaterDailyNorma.module.css';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const WaterDailyNorma = ({ dailyNorm }) => {
      const { t } = useTranslation(); //  хук для отримання функції перекладу

  return (
    <div className={css.dailyNormaWrapper}>
      <p className={css.normaValue}>{dailyNorm} L</p>
      <p className={css.normaTitle}>{t('my daily norma')}</p>
    </div>
  );
};

export default WaterDailyNorma;
