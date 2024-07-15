import css from './LogOutModal.module.css';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations';
import { useEffect, useRef, useState } from 'react';
import { icons as sprite } from '../../assets/icons/index.js';
import { selectIsLoggedIn } from '../../redux/selectors.js';


const LogOutModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
 
  const handleLogOut = () => {
      
   console.log ("before logout:", isLoggedIn)
    
    dispatch(logoutUser()).then(() => {
      console.log('logout success');
    closeModal();
     navigate('/');} ).catch(error => console.log(error));
      
    
  };
 
  const [closeIcon, setCloseIcon] = useState('icon-close-24x24');
  const svgRef = useRef(null);
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

export default LogOutModal;
