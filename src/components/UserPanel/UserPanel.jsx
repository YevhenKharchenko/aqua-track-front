import { useRef, useState, useEffect, useCallback } from 'react';
import { useModal } from '../../hooks/useModal.jsx';
import UserBar from '../UserBar/UserBar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';
import css from './UserPanel.module.css';

const UserPanel = () => {
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

  return (
    <>
      <div className={css.tabletThumb}>
        <h2 className={css.greeting}>
          Hello, <span className={css.greetName}>Nadia</span>
        </h2>
        <UserBar ref={userBarRef} onClick={togglePopover} />
      </div>
      {showPopover && (
        <UserBarPopover showPopover={showPopover} referenceElement={userBarRef.current}>
          <button className={css.popoverBtn} type="button" data-setting-button>
            <svg width="16" height="16">
              <use
                className={css.iconSettings}
                href="./src/assets/icons/sprite.svg#icon-settings-16x16"
              ></use>
            </svg>
            Setting
          </button>
          <button className={css.logoutBtn} type="button" onClick={openModal} data-logout-button>
            <svg width="16" height="16">
              <use
                className={css.iconLogout}
                href="./src/assets/icons/sprite.svg#icon-log-out-16x16"
              ></use>
            </svg>
            Log out
          </button>
        </UserBarPopover>
      )}
    </>
  );
};

export default UserPanel;
