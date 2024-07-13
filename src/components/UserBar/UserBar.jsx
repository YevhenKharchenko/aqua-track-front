import css from './UserBar.module.css';
import avatar from '../../assets/images/avatar.png';
import { forwardRef } from 'react';

// add props:name(useremail), avatar
const UserBar = forwardRef((props, ref) => {
  const { togglePopover } = props;
  return (
    <div className={css.tabletThumb}>
      <button className={css.userBarBtn} ref={ref} onClick={togglePopover} type="button">
        <p className={css.greetNameText}>Nadia</p>
        <img className={css.avatar} src={avatar} width="38" height="38" alt="User's avatar" />
        <svg width="16" height="16">
          <use
            className={css.iconArrowUp}
            href="./src/assets/icons/sprite.svg#icon-arrow-up-16x16"
          ></use>
        </svg>
      </button>
    </div>
  );
});

UserBar.displayName = 'UserBar';
export default UserBar;
