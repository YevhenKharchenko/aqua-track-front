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
      <button type="button" className={css.close} onClick={() => onClose()}>
        {/* <svg className={css.svgClose} stroke="#323f47" width="28" height="28">
          <use href={sprite + "#icon-close-24x24"}></use>
        </svg> */}
      </button>
      {children}
    </Modal>
  );
};
