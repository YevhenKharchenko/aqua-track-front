import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { icons as sprite } from '../../assets/icons/index.js';
import css from './ExampleWaterModal.module.css';
import { useTranslation } from 'react-i18next'; // Імпортуйте хук useTranslation

const ExampleWaterModal = ({ onClose, operation }) => {
  const { t } = useTranslation(); // Використовуйте хук для отримання функції перекладу
  const [value, setValue] = useState(50);

  // Замість жорстко закодованих рядків використовуйте t для перекладу
  const modalTitle = operation === 'add' ? t('Add water') : t('Edit the entered amount of water');
  const modalText = operation === 'add' ? t('Choose a value:') : t('Correct entered data:');

  const currentTime = new Date().toTimeString().slice(0, 5);

  const handleDecrement = () => {
    setValue(prevValue => (prevValue > 50 ? prevValue - 50 : prevValue));
  };

  const handleIncrement = () => {
    setValue(prevValue => (prevValue < 1500 ? prevValue + 50 : prevValue));
  };

  const handleChange = e => {
    setValue(Number(e.target.value));
  };

  return (
    // <div className={css.backdrop}>
    <div className={css.container}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        <svg className={css.closeIcon}>
          <use xlinkHref={`${sprite}#icon-close-24x24`}></use>
        </svg>
      </button>
      <h2 className={css.modalTitle}>{modalTitle}</h2>
      <p className={css.modalText}>{modalText}</p>
      <p className={css.amountText}>{t('Amount of water:')}</p>
      <div className={css.quantityWrapper}>
        <button className={css.quantityBtn} type="button" onClick={handleDecrement}>
          <svg className={css.quantityIcon}>
            <use xlinkHref={`${sprite}#icon-minus-40x40`}></use>
          </svg>
        </button>
        <div className={css.itemQuantity}>
          <span className={css.quantitySpan}>{value} ml</span>
        </div>
        <button className={css.quantityBtn} type="button" onClick={handleIncrement}>
          <svg className={css.quantityIcon}>
            <use xlinkHref={`${sprite}#icon-plus-40x40`}></use>
          </svg>
        </button>
      </div>
      <form className={css.waterForm}>
        <label htmlFor="" className={css.labelTime}>
          {t('Recording time:')}
          <input className={css.modalInput} type="text" defaultValue={currentTime} />
        </label>
        <label htmlFor="" className={css.labelValue}>
          {t('Enter the value of the water used:')}
          <input className={css.modalInput} type="text" value={value} onChange={handleChange} />
        </label>
        <button type="submit" className={css.saveBtn}>
          {t('Save')}
        </button>
      </form>
    </div>
    // </div>
  );
};

export default ExampleWaterModal;
