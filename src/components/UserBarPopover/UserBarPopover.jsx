import css from './UserBarPopover.module.css';

const UserBarPopover = () => {
  return (
    <div className={css.popover}>
      <button className={css.popoverBtn} type="button">
        <svg width="16" height="16">
          <use
            className={css.iconSettings}
            href="./src/assets/icons/sprite.svg#icon-settings-16x16"
          ></use>
        </svg>
        Setting
      </button>
      <button className={css.popoverBtn && css.logoutBtn} type="button">
        <svg width="16" height="16">
          <use
            className={css.iconLogout}
            href="./src/assets/icons/sprite.svg#icon-log-out-16x16"
          ></use>
        </svg>
        Log out
      </button>
    </div>
  );
};
export default UserBarPopover;
