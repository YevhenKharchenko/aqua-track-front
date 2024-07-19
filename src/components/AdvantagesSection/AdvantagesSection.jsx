import css from './AdvantagesSection.module.css';

import Male from '../../assets/images/Male.png';
import Memojis from '../../assets/images/Memojis.png';
import Female from '../../assets/images/Female.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
// import Loader from '../../shared/components/Loader/Loader';
import { selectUser } from '../../redux/selectors';

const AdvantagesSection = () => {
  const allUsers = useSelector(selectUser);
  console.log(allUsers.users);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={css.container}>
      <div className={css.usersContainer} onClick={toggleVisibility}>
        <div className={css.imageThumb}>
          <img className={css.avatar} src={Memojis} width="26" height="28" alt="User's avatar" />
          <img className={css.avatar} src={Male} width="26" height="28" alt="User's avatar" />
          <img className={css.avatar} src={Female} width="26" height="28" alt="User's avatar" />
        </div>
        <p className={css.text}>
          Our <span className={css.accentText}>happy</span> customers
        </p>
      </div>
      <div className={css.advantages}></div>

      {isVisible && (
        <div className={css.userList}>
          <span className={css.closeBtn} onClick={toggleVisibility}>
            x
          </span>
          <ul>
            {allUsers.users && allUsers.users.length > 0 ? (
              allUsers.users.map(user => (
                <li key={user.id}>
                  <img src={user.avatar} alt="User's avatar" />
                  <p>{user.name}</p>
                </li>
              ))
            ) : (
              <li>No users found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdvantagesSection;
