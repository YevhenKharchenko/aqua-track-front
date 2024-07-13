import { useState } from 'react';
import css from './AddWaterBtn.module.css';
import WaterModal from '../WaterModal/WaterModal';
import sprite from '../../assets/icons/sprite.svg';
const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button type="button" className={css.btnContainer} onClick={handleOpenModal}>
        <svg className={css.icon}>
          <use href={`${sprite}#icon-plus16x16`}></use>
        </svg>
        Add water
      </button>
      <WaterModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
export default AddWaterBtn;
