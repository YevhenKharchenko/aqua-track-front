import clsx from 'clsx';
import css from './Container.module.css';

const Container = ({ className, children }) => {
  return <div className={clsx(css.container, className && className)}>{children}</div>;
};

export default Container;
