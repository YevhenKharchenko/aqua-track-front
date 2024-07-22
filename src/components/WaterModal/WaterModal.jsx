import { icons as sprite } from '../../assets/icons/index.js';
import { WaterForm } from '../WaterForm/WaterForm';

import css from './WaterModal.module.css';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const WaterModal = ({ isOpen, mode, onClose, water }) => {
  const { t } = useTranslation(); //  хук для отримання функції перекладу

  const title =
    mode === 'add' ? (
      <h2 className={css.title}>{t('add water')}</h2>
    ) : (
      <h2 className={css.title}>{t('edit the entered amount of water')}</h2>
    );

  const subtitle =
    mode === 'add' ? (
      <p className={css.subtitle}>{t('choose a value')}:</p>
    ) : (
      <p className={css.subtitle}>{t('correct entered data')}:</p>
    );

  return (
    <div className={css.wrapModal}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        <svg className={css.closeIcon}>
          <use xlinkHref={`${sprite}#icon-close-24x24`}></use>
        </svg>
      </button>
      {title}
      {subtitle}
      <WaterForm mode={mode} onClose={onClose} water={water} />
    </div>
  );
};

export default WaterModal;
