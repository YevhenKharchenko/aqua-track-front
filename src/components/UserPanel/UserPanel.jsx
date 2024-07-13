import { useRef, useState, useEffect } from 'react';
import css from './UserPanel.module.css';
import UserBar from '../UserBar/UserBar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';

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
      !event.target.closest('.popoverBtn')
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

  return (
    <div>
      <h2 className={css.greeting}>
        Hello, <span className={css.greetName}>Nadia</span>
      </h2>
      <UserBar ref={userBarRef} onClick={togglePopover} />

      {showPopover && (
        <UserBarPopover showPopover={showPopover} referenceElement={userBarRef.current}>
          <button className={css.popoverBtn} type="button">
            <svg width="16" height="16">
              <use
                className={css.iconSettings}
                href="./src/assets/icons/sprite.svg#icon-settings-16x16"
              ></use>
            </svg>
            Setting
          </button>
          <button className={css.logoutBtn} type="button">
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
    </div>
  );
};

export default UserPanel;