import css from './UserBar.module.css';
import { forwardRef } from 'react';
import { icons as sprite } from '../../assets/icons/index.js';

const UserBar = forwardRef(({ onClick, name, avatar, showPopover }, ref) => {
  return (
    <button
      data-tour="user-bar-step"
      className={css.userBarBtn}
      ref={ref}
      onClick={onClick}
      type="button"
    >
      <p className={css.greetNameText}>{name}</p>
      <img className={css.avatar} src={avatar} width="38" height="38" alt="User's avatar" />
      {showPopover ? (
        <svg width="16" height="16">
          <use className={css.iconArrowUp} xlinkHref={`${sprite}#icon-arrow-up-16x16`}></use>
        </svg>
      ) : (
        <svg width="16" height="16">
          <use className={css.iconArrowDown} xlinkHref={`${sprite}#icon-arrow-down-16x16`}></use>
        </svg>
      )}
    </button>
  );
});

UserBar.displayName = 'UserBar';
export default UserBar;
