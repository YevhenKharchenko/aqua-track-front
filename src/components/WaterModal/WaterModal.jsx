import css from "./WaterModal.module.css";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { icons as sprite } from '../../assets/icons/index.js';

const WaterModal = ({ onClose, operation }) => {
    const [value, setValue] = useState(250);

    const modalTitle = operation === 'add' ? 'Edit the entered amount of water' : 'Add water';
    
    const modalText = operation === 'add' ? 'Correct entered data:' : 'Choose a value:';
    
    const currentTime = new Date().toTimeString().slice(0, 5);

  const handleDecrease = () => {
    if (value === 250) return;
    setValue(value - 250);
  };

  const handleIncrease = () => {
    if (value === 1500) return;
    setValue(value + 250);
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
      <p className={css.amountText}>Amount of water:</p>
        <div className={css.quantityWrapper}>
          
        <button
          className={css.quantityBtn}
          type="button"
          onClick={() => {
            handleDecrease();
          }}
        >
          <svg className={css.quantityIcon}>
            <use xlinkHref={`${sprite}#icon-minus-40x40`}></use>
          </svg>
          </button>
          
        <div className={css.itemQuantity}>
          <span className={css.quantitySpan}>{value} ml</span>
          </div>
          
        <button
          className={css.quantityBtn}
          type="button"
          onClick={() => {
            handleIncrease();
          }}
        >
          <svg className={css.quantityIcon}>
            <use xlinkHref={`${sprite}#icon-plus-40x40`}></use>
          </svg>
          </button>
          
      </div>
      <form className={css.waterForm}>
        <label htmlFor="" className={css.labelTime}>
          Recording time:
          <input className={css.modalInput} type="text" defaultValue={currentTime} />
        </label>
        <label htmlFor="" className={css.labelValue}>
          Enter the value of the water used:
          <input className={css.modalInput} type="text" value={value} />
          </label>
          
        <button type="submit" className={css.saveBtn}>
          Save
        </button>
      </form>
    </div>
    // </div>
  );
};

export default WaterModal;