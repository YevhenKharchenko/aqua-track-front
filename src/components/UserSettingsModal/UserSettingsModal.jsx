import { icons } from '../../assets/icons/index.js';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';

import css from './UserSettingsModal.module.css';




const UserSettingsModal = () => {
  return (
    <div className={css.modalWrapper}>
      <h2 className={css.modalTitle}>Setting</h2>
      <button className={css.modalCloseButton} type="button">
        <svg width="24" height="24">
          <use xlinkHref={`${icons}#icon-close-24x24`}></use>
        </svg>
      </button>
      <UserSettingsForm />
    </div>
  );
};

export default UserSettingsModal;
