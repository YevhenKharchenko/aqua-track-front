import { useModal } from '../hooks/useModal.jsx';
import { useCallback } from 'react';

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
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<ModalContent onClose={closeModal} />);
  }, [setModal, closeModal]);

  return (
    <button type="button" onClick={openModal}>
      Open Modal
    </button>
  );
};

export default ExampleModal;
