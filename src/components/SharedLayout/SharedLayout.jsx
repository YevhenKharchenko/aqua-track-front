import { Suspense } from 'react';
import Loader from '../../shared/components/Loader/Loader.jsx';
import Container from '../../shared/components/Container/Container.jsx';
import css from './SharedLayout.module.css';

const SharedLayout = ({ children }) => {
  return (
    <Container className={css.container}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </Container>
  );
};

export default SharedLayout;
