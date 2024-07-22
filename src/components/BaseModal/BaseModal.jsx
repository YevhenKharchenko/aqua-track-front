import Modal from 'react-modal';
import css from './BaseModal.module.css';
import sprite from '../../assets/icons/sprite.svg';

Modal.setAppElement('#root');

export const BaseModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      ariaHideApp={false}
      overlayClassName={css.overlay}
    >
      <button type="button" className={css.close} onClick={() => onClose()}></button>
      {children}
    </Modal>
  );
};
