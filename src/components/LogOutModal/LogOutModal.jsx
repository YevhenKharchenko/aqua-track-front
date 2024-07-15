
import css from './LogOutModal.module.css';
import { useModal } from '../../hooks/useModal.jsx';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { icons as sprite } from '../../assets/icons/index.js';
const LogOutModalContent = ({closeModal, handleLogOut}) => {
    
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
            <button className={css.closeButton} type="button" onClick={closeModal}>
                <svg ref={svgRef}>
                    <use xlinkHref={`${sprite}#${closeIcon}`}></use>
                </svg>
            </button>
             
            <div className={css.textContainer}>
              
                <h4 className={css.title}>Log out</h4>
                <p className={css.text}> Do you really want to leave?</p>
            </div>
            <div className={css.buttonsContainer}>
                <button className={css.logOutButton} onClick={handleLogOut}>Log out</button>
                <button className={css.cancelButton} onClick={closeModal}>Cancel</button>
            </div>
                  
        </div>
    )
};
const LogOutModal = () => {
    // const dispatch = useDispatch();
    const handleLogOut = () => {
        // dispatch(logoutUser());
        closeModal();
    };
     const setModal = useModal();
  const closeModal = useCallback(() => {
        setModal(null);
    }, [setModal]);
    const openModal = useCallback(() => {    
      
        setModal(<LogOutModalContent closeModal={closeModal} handleLogOut={handleLogOut}   />);
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

export default LogOutModal