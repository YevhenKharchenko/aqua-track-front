import css from './AdvantagesSection.module.css';
import Male from '../../assets/images/Male.png';
import Memojis from '../../assets/images/Memojis.png';
import Female from '../../assets/images/Female.png';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import Loader from '../../shared/components/Loader/Loader';
import { selectUser, selectIsRefreshing } from '../../redux/selectors';

const AdvantagesSection = () => {
  const allUsers = useSelector(selectUser);
  const loading = useSelector(selectIsRefreshing);
  const userContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleClickOutside = event => {
    if (userContainerRef.current && !userContainerRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className={css.container}>
      <div className={css.usersContainer} onClick={toggleVisibility}>
        <div className={css.imageThumb}>
          <img className={css.avatar} src={Memojis} width={26} height={28} alt="User's avatar" />
          <img className={css.avatar} src={Male} width={26} height={28} alt="User's avatar" />
          <img className={css.avatar} src={Female} width={26} height={28} alt="User's avatar" />
        </div>
        <p className={css.text}>
          Our <span className={css.accentText}>happy</span> customers
        </p>
      </div>
      <div className={css.advantages}>
        <div className={css.thumb}>
          <div className={css.habit}>Habit drive</div>
          <div className={css.statistics}>
            <a href="#statistics">View statistics</a>
          </div>
        </div>
        <div className={css.personalRate}>Personal rate setting</div>
      </div>

      {isVisible && (
        <div className={css.userContainer} ref={userContainerRef}>
          <span className={css.closeBtn} onClick={toggleVisibility}>
            x
          </span>
          {loading && <Loader />}
          <ul className={css.userList}>
            {allUsers.users && allUsers.users.length > 0 ? (
              allUsers.users.map(user => (
                <li className={css.userItem} key={user._id}>
                  <img
                    className={css.userPhoto}
                    src={user.avatar}
                    alt="User's avatar"
                    width={26}
                    height={28}
                  />
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
