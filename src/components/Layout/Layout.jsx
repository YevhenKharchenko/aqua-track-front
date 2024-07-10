import { Suspense } from 'react';
import Loader from '../Loader/Loader';
import css from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
