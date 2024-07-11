import css from './UserBar.module.css';
// add props:name(useremail), avatar
const UserBar = ({ onClick }) => {
  return (
    <div className={css.tabletThumb}>
      <button onClick={onClick} className={css.userBarBtn} type="button">
        <p className={css.greetNameText}>Nadia</p>
        <img
          className={css.avatar}
          src="./src/assets/images/avatar.png"
          width="38"
          height="38"
          alt="User's avatar"
        />
        <svg width="16" height="16">
          <use
            className={css.iconArrowUp}
            href="./src/assets/icons/sprite.svg#icon-arrow-up-16x16"
          ></use>
        </svg>
      </button>
    </div>
  );
};
export default UserBar;
