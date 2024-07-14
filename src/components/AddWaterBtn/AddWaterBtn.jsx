import { useState } from 'react';
import css from './AddWaterBtn.module.css';
import WaterModal from '../WaterModal/WaterModal';
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
          <use href="../../assets/icons/sprite.svg#icon-plus16x16"></use>
        </svg>
        Add water
      </button>
      <WaterModal isOpen={isModalOpen} onClose={handleCloseModal} mode="add" />
    </>
  );
};
export default AddWaterBtn;
