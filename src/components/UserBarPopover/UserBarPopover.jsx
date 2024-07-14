import { usePopper } from 'react-popper';
import css from './UserBarPopover.module.css';
import { useState } from 'react';

const UserBarPopover = ({ showPopover, referenceElement, children }) => {
  const [popperElement, setPoperElement] = useState(false);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start', // Adjust placement as needed
  });

  if (!showPopover) {
    return null;
  }

  return (
    <>
      {showPopover && (
        <div
          ref={setPoperElement}
          className={css.popover}
          style={styles.popper}
          {...attributes.popper}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default UserBarPopover;
