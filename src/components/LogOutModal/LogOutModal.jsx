import css from './LogOutModal.module.css';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations';
import { useCallback, useEffect, useRef, useState } from 'react';
import { icons as sprite } from '../../assets/icons/index.js';

const LogOutModalContent = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [closeIcon, setCloseIcon] = useState('icon-close-24x24');
  const svgRef = useRef(null);

  const handleLogOut = () => {
    dispatch(logoutUser());
    closeModal();
  };

  const updateCloseIconSize = () => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const windowWidth = window.innerWidth;

      let iconSize = 24;
      let iconId = 'icon-close-24x24';

      if (windowWidth >= 768) {
        iconSize = 28;
        iconId = 'icon-close-28x28';
      }

      svgElement.setAttribute('width', iconSize);
      svgElement.setAttribute('height', iconSize);

      if (closeIcon !== iconId) {
        setCloseIcon(iconId);
      }
    }
  };

  useEffect(() => {
    updateCloseIconSize();
    window.addEventListener('resize', updateCloseIconSize);

    return () => {
      window.removeEventListener('resize', updateCloseIconSize);
    };
  }, []);
  

  return (
    <div className={css.logOutModalContainer}>
       
      <button className={css.logOutModalCloseButton} type="button" onClick={closeModal}>
        <svg ref={svgRef}>
          <use xlinkHref={`${sprite}#${closeIcon}`}></use>
        </svg>
      </button>

      <div className={css.logOutModalTextContainer}>
        <h4 className={css.logOutModalTitle}>Log out</h4>
        <p className={css.logOutModalText}> Do you really want to leave?</p>
      </div>
      <div className={css.logOutModalButtonsContainer}>
        <button className={css.logOutButton} onClick={handleLogOut}>
          Log out
        </button>
        <button className={css.logOutModalCancelButton} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
const LogOutModal = () => {
  // const dispatch = useDispatch();
  const handleLogOut = () => {
    // dispatch(logoutUser());
    // closeModal();
  };
  const setModal = useModal();
  const closeModal = useCallback(() => {
    setModal(null);
  }, [setModal]);
  const openModal = useCallback(() => {
    setModal(<LogOutModalContent closeModal={closeModal} handleLogOut={handleLogOut} />);
  }, [setModal, closeModal]);

  return (
    <>
      <button type="button" onClick={openModal}>
        LogOut
        <svg style={{ width: 20, height: 20 }}>
          <use xlinkHref={`${sprite}#icon-arrow-right-18x18`}></use>
        </svg>
      </button>
    </>
  );
};

export default LogOutModalContent;
