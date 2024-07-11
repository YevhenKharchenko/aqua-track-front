import UserBar from '../UserBar/UserBar';
import css from './UserPanel.module.css';
const UserPanel = () => {
  // has to open popover
  const handleClick = () => {
    alert('UserbarBtn clicked');
  };
  return (
    <div>
      <h2 className={css.greeting}>
        Hello, <span className={css.greetName}>Nadia</span>
      </h2>
      <UserBar onClick={handleClick} />
    </div>
  );
};

export default UserPanel;
