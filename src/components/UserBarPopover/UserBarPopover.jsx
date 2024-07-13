import { usePopper } from 'react-popper';
import clsx from 'clsx';
import css from './UserBarPopover.module.css';
import { forwardRef } from 'react';

const UserBarPopover = forwardRef((props, ref) => {
  const { isOpen, userBarRef } = props;
  console.log(userBarRef, ref);
  const { styles, attributes } = usePopper(userBarRef.current, ref, {
    placement: 'bottom-start', // Adjust placement as needed
  });

  return (
    <>
      {isOpen && (
        <div
          // className={clsx(css.popover, { [css.popoverHidden]: !isOpen })}
          className={css.popover}
          style={styles.popper}
          {...attributes.popper}
        >
          <button
            className={clsx(css.popoverBtn, { [css.popoverHidden]: !isOpen })}
            ref={ref}
            type="button"
          >
            <svg width="16" height="16">
              <use
                className={css.iconSettings}
                href="./src/assets/icons/sprite.svg#icon-settings-16x16"
              ></use>
            </svg>
            Setting
          </button>
          <button className={css.logoutBtn} type="button">
            <svg width="16" height="16">
              <use
                className={css.iconLogout}
                href="./src/assets/icons/sprite.svg#icon-log-out-16x16"
              ></use>
            </svg>
            Log out
          </button>
        </div>
      )}
    </>
  );
});

UserBarPopover.displayName = 'UserBarPopover';
export default UserBarPopover;
