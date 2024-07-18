import { icons } from '../../assets/icons/index.js';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';

import css from './UserSettingsModal.module.css';

const UserSettingsModal = ({ onClose }) => {
  return (
    <div className={css.modalWrapper}>
      <h2 className={css.modalTitle}>Setting</h2>
      <button className={css.modalCloseButton} type="button" onClick={onClose}>
        <svg className={css.closeIcon} width="18" height="18">
          <use xlinkHref={`${icons}#icon-close-24x24`}></use>
        </svg>
      </button>
      <UserSettingsForm onClose={onClose} />
    </div>
  );
};

export default UserSettingsModal;
