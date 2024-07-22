import clsx from 'clsx';
import { useModal } from '../../hooks/useModal.jsx';
import { useCallback } from 'react';
import WaterModal from '../WaterModal/WaterModal';
import css from './AddWaterBtn.module.css';
import { useTranslation } from 'react-i18next'; // імпорт хука useTranslation
import '../../i18n'; // Імпортуйте конфігурацію i18next

const AddWaterBtn = ({ className, icon, iconClassName }) => {
  const { t } = useTranslation(); // використання хука для перекладу
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} operation="add" mode="add" />);
  }, [setModal, closeModal]);

  return (
    <>
      <button type="button" className={clsx(css.btnContainer, className)} onClick={openModal}>
        <svg className={clsx(css.icon, iconClassName)}>
          <use href={icon}></use>
        </svg>
        {t('addWater')} 
            </button>
    </>
  );
};

export default AddWaterBtn;