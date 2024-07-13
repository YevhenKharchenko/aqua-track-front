import { useState, useEffect } from 'react';
import css from './DeleteWaterModal.module.css';
import SharedSVG from '../../shared/components/SharedSVG/SharedSVG.jsx';
import Button from '../../shared/components/Button/Button.jsx';

const DeleteWaterModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.deleteModal}>
        <SharedSVG
          className={css.closeIcon}
          width="28"
          height="28"
          id="icon-cross"
          onClick={handleClose}
        />
        <h3 className={css.modalDeleteTitle}>Delete entry</h3>
        <p className={css.modalDeleteText}>
          Are you sure you want to delete the entry?
        </p>
        <div className={css.modalButtonContainer}>
          <Button variant="primary">Delete</Button>
          <Button variant="default" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWaterModal;