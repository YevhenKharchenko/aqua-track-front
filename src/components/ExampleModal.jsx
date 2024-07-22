import { useModal } from '../hooks/useModal.jsx';
import { useCallback } from 'react';
import { icons as sprite } from '../assets/icons/index.js';
import ExampleWaterModal from './ExampleWaterModal/ExampleWaterModal.jsx';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const ModalContent = ({ onClose }) => {
  return (
    <div>
      <h1>Hello!</h1>
      <button type="button" onClick={onClose}>
        close modal
      </button>
    </div>
  );
};

const ExampleModal = () => {
  const { t } = useTranslation(); //  хук для отримання функції перекладу

  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<ExampleWaterModal onClose={closeModal} operation="add" />);
  }, [setModal, closeModal]);

  return (
    <>
      <button type="button" onClick={openModal}>
        {t('open modal')}
        <svg style={{ width: 20, height: 20 }}>
          <use xlinkHref={`${sprite}#icon-arrow-right-18x18`}></use>
        </svg>
      </button>
    </>
  );
};

export default ExampleModal;
