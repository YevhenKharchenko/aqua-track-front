import { useForm } from 'react-hook-form';
import { icons as sprite } from '../../assets/icons/index.js';
import css from './ExampleWaterModal.module.css';

const ExampleWaterModal = ({ onClose }) => {
  const handleDecrease = () => {};
  const handleIncrease = () => {};

  return (
    <div className={css.container}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        <svg className={css.closeIcon}>
          <use xlinkHref={`${sprite}#icon-close-24x24`}></use>
        </svg>
      </button>
      <h2 className={css.modalTitle}>Add water</h2>
      <p className={css.modalText}>Choose a value</p>
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
          <span className={css.quantitySpan}>50 ml</span>
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
          <input className={css.modalInput} type="text" />
        </label>
        <label htmlFor="" className={css.labelValue}>
          Enter the value of the water used:
          <input className={css.modalInput} type="text" />
        </label>
        <button type="submit" className={css.saveBtn}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ExampleWaterModal;
