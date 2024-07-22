import { useSelector } from 'react-redux';
//import { useState } from 'react';

import { selectWaterPerDayArr } from '../../redux/selectors.js';
import { calculateFeasibility } from '../../helpers/calculateFeasibility.js';

import css from './WaterProgressBar.module.css';

import { useTranslation } from 'react-i18next'; // хук useTranslation

const WaterProgressBar = ({ dailyNorm }) => {
    const { t } = useTranslation(); //  хук для отримання функції перекладу

  const waterPerDay = useSelector(selectWaterPerDayArr);
  const feasibility = calculateFeasibility(waterPerDay, dailyNorm);

  const shouldShowDynamicLabel = feasibility !== 0 && feasibility !== 50 && feasibility !== 100;

  return (
    <div className={css.progressBarContainer}>
      <h3 className={css.progressTitle}>{t('today')}</h3>

      <div className={css.progressBar}>
        <div className={css.progressBarFill} style={{ width: `${feasibility}%` }}>
          <div className={css.progressIndicator}></div>
        </div>
      </div>
      {shouldShowDynamicLabel && (
        <div className={css.dynamicPercentageLabel} style={{ left: `${feasibility}%` }}>
          {feasibility.toFixed(0)}%
        </div>
      )}

      <ul className={css.percentageList}>
        <li>0%</li>
        <li>50%</li>
        <li>100%</li>
      </ul>
    </div>
  );
};

export default WaterProgressBar;
