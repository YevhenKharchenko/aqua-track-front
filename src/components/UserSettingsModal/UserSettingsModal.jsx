import { icons } from '../../assets/icons/index.js';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';

import css from './UserSettingsModal.module.css';

import { useTranslation } from 'react-i18next'; // хук useTranslation


const UserSettingsModal = ({ onClose }) => {
    const { t } = useTranslation(); //  хук для отримання функції перекладу

  return (
    <div className={css.modalWrapper}>
      <h2 className={css.modalTitle}>{t('setting')}</h2>
      <button className={css.modalCloseButton} type="button" onClick={onClose}>
        <svg className={css.closeIcon} width="24" height="24">
          <use xlinkHref={`${icons}#icon-close-24x24`}></use>
        </svg>
      </button>
      <UserSettingsForm onClose={onClose} />
    </div>
  );
};

export default UserSettingsModal;
