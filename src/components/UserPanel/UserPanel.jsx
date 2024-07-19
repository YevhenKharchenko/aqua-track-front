import { useRef, useState, useEffect, useCallback } from 'react';
import { useModal } from '../../hooks/useModal.jsx';
import { icons as sprite } from '../../assets/icons/index.js';
import UserBar from '../UserBar/UserBar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal.jsx';
import css from './UserPanel.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/selectors.js';
import { refreshUser } from '../../redux/auth/operations.js';
import toast from 'react-hot-toast';

const UserPanel = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [showPopover, setShowPopover] = useState(false);
  const userBarRef = useRef(null);
  const togglePopover = () => {
    setShowPopover(prevShowPopover => !prevShowPopover);
  };

  const handleClickOutside = event => {
    if (
      userBarRef.current &&
      !userBarRef.current.contains(event.target) &&
      !event.target.closest('.popoverBtn') &&
      !event.target.closest('[data-logout-button]') &&
      !event.target.closest('[data-setting-button]')
    ) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopover]);

  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<LogOutModal closeModal={closeModal} />);
  }, [setModal, closeModal]);

  const closeSettingModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openSettingModal = useCallback(() => {
    // dispatch(refreshUser())
    //   .then(() => {
    //     toast.success('We successfully received your previous data from the server', {
    //       autoClose: 5000,
    //     });
    //     console.log('currentUser', currentUser);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     toast.error('Something went wrong. During getting your data from server.', {
    //       duration: 8000,
    //     });
    //   });
    setModal(<UserSettingsModal onClose={closeSettingModal} />);
  }, [setModal, closeSettingModal]);

  return (
    <>
      <div className={css.tabletThumb}>
        <h2 className={css.greeting}>
          Hello, <span className={css.greetName}>{currentUser?.name}</span>
        </h2>
        <UserBar
          ref={userBarRef}
          onClick={togglePopover}
          name={currentUser?.name}
          avatar={currentUser?.avatar}
          showPopover={showPopover}
        />
      </div>
      {showPopover && (
        <UserBarPopover showPopover={showPopover} referenceElement={userBarRef.current}>
          <button
            className={css.popoverBtn}
            type="button"
            onClick={openSettingModal}
            data-setting-button
          >
            <svg width="16" height="16">
              <use className={css.iconSettings} xlinkHref={`${sprite}#icon-settings-16x16`}></use>
            </svg>
            Setting
          </button>
          <button className={css.logoutBtn} type="button" onClick={openModal} data-logout-button>
            <svg width="16" height="16">
              <use className={css.iconLogout} xlinkHref={`${sprite}#icon-log-out-16x16`}></use>
            </svg>
            Log out
          </button>
        </UserBarPopover>
      )}
    </>
  );
};

export default UserPanel;
