import { useRef, useState, useEffect } from 'react';
import css from './UserPanel.module.css';
import UserBar from '../UserBar/UserBar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
const UserPanel = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const userBarRef = useRef(null);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  useEffect(() => {
    if (isPopoverOpen) {
      // Log popoverRef.current to see the value after each render
      console.log('Popover Ref:', popoverRef.current);
    }
  }, [isPopoverOpen]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        userBarRef.current &&
        !userBarRef.current.contains(event.target)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h2 className={css.greeting}>
        Hello, <span className={css.greetName}>Nadia</span>
      </h2>
      <UserBar ref={userBarRef} togglePopover={togglePopover} />

      {isPopoverOpen && (
        <UserBarPopover ref={popoverRef} userBarRef={userBarRef} isOpen={isPopoverOpen} />
      )}
    </div>
  );
};

export default UserPanel;
