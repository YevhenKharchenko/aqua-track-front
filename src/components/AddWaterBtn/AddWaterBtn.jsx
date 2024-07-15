import clsx from 'clsx';
import { useModal } from '../../hooks/useModal.jsx';
import { useCallback } from 'react';
import { useState } from 'react';
import WaterModal from '../WaterModal/WaterModal';
import sprite from '../../assets/icons/sprite.svg';
import css from './AddWaterBtn.module.css';

const AddWaterBtn = ({ className }) => {
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} operation="add" mode="add" />);
  }, [setModal, closeModal]);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };
  return (
    <>
      <button
        type="button"
        className={clsx(css.btnContainer, className && className)}
        onClick={openModal}
      >
        <svg className={css.icon}>
          <use href={`${sprite}#icon-plus16x16`}></use>
        </svg>
        Add water
      </button>
    </>
  );
};
export default AddWaterBtn;
