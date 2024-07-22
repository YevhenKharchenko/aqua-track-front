import { useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import css from './GlobalModal.module.css';
import { icons as sprite } from '../../assets/icons/index.js';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(47, 47, 47, 0.6)',
    zIndex: 100,
  },
  content: {
    zIndex: 100,
  },
};

Modal.setAppElement('#root');

export const GlobalModal = ({ isOpen, onRequestClose, children, title }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    },
    [onRequestClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className={title === 'Setting' ? css.content : css.logoutContent}
      style={customStyles}
      id="userSettingsModal"
    >
      <div className={css.modalHeader}>
        {title === 'Setting' && (
          <div className={css.textBox}>
            <p className={css.titleHeader}>{title}</p>
          </div>
        )}

        <button className={css.closeBtn} onClick={onRequestClose}>
          <svg className={css.closeIcon}>
            <use xlinkHref={`${sprite}#icon-close-24x24`}></use>
          </svg>
        </button>
      </div>
      {(title === 'Log out' || title === 'Delete') && (
        <div className={css.textBox}>
          <p className={css.titleHeader}>{title}</p>
        </div>
      )}
      <div className={css.modalContent}>{children}</div>
    </Modal>
  );
};