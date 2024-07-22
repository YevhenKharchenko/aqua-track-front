import css from './AdvantagesSection.module.css';
import ava1 from '../../assets/images/ava1.jpg';
import ava1_2x from '../../assets/images/ava1_2x.jpg';
import ava2 from '../../assets/images/ava2.jpg';
import ava2_2x from '../../assets/images/ava2_2x.jpg';
import ava3 from '../../assets/images/ava3.jpg';
import ava3_2x from '../../assets/images/ava3_2x.jpg';
import ava1tab from '../../assets/images/ava1tab.jpg';
import ava1tab_2x from '../../assets/images/ava1tab_2x.jpg';
import ava2tab from '../../assets/images/ava2tab.jpg';
import ava2tab_2x from '../../assets/images/ava2tab_2x.jpg';
import ava3tab from '../../assets/images/ava3tab.jpg';
import ava3tab_2x from '../../assets/images/ava3tab_2x.jpg';

import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import Loader from '../../shared/components/Loader/Loader';
import { selectUsers, selectIsRefreshing, selectCountUsers } from '../../redux/selectors';

const AdvantagesSection = () => {
  const allUsers = useSelector(selectUsers);
  const loading = useSelector(selectIsRefreshing);
  const userContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const countUsers = useSelector(selectCountUsers);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleClickOutside = event => {
    if (userContainerRef.current && !userContainerRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  return (
    <div className={css.container}>
      <div className={css.usersContainer} onClick={toggleVisibility}>
        <div className={css.imageThumb}>
          <picture className={css.picture1}>
            <source srcSet={`${ava1tab_2x} 2x, ${ava1tab} 1x`} media="(min-width: 768px)" />
            <source srcSet={`${ava1_2x} 2x, ${ava1} 1x`} media="(max-width: 767px)" />
            <img
              className={`${css.avatar} ${css.avatar1}`}
              src={ava1tab}
              width={47}
              height={47}
              alt="User's avatar"
            />
          </picture>
          <picture className={css.picture2}>
            <source srcSet={`${ava2tab_2x} 2x, ${ava2tab} 1x`} media="(min-width: 768px)" />
            <source srcSet={`${ava2_2x} 2x, ${ava2} 1x`} media="(max-width: 767px)" />
            <img
              className={`${css.avatar} ${css.avatar2}`}
              src={ava2tab}
              width={47}
              height={47}
              alt="User's avatar"
            />
          </picture>
          <picture className={css.picture3}>
            <source srcSet={`${ava3tab_2x} 2x, ${ava3tab} 1x`} media="(min-width: 768px)" />
            <source srcSet={`${ava3_2x} 2x, ${ava3} 1x`} media="(max-width: 767px)" />
            <img
              className={`${css.avatar} ${css.avatar3}`}
              src={ava3tab}
              width={47}
              height={47}
              alt="User's avatar"
            />
          </picture>
        </div>
        <p className={css.text}>
          Our <span className={css.accentText}>{countUsers} happy</span> customers
        </p>
      </div>
      <div className={css.advantages}>
        <div className={css.thumb}>
          <p className={css.habit}>Habit drive</p>
          <div className={css.statistics}>
            <p>View statistics</p>
          </div>
        </div>
        <p className={css.personalRate}>Personal rate setting</p>
      </div>

      {isVisible && (
        <div className={css.userContainer} ref={userContainerRef}>
          <span className={css.closeBtn} onClick={toggleVisibility}>
            x
          </span>
          {loading && <Loader />}
          <ul className={css.userList}>
            {allUsers && allUsers.length > 0 ? (
              allUsers.map(user => (
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
