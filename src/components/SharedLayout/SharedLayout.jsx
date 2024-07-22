import { Suspense } from 'react';
import Loader from '../../shared/components/Loader/Loader.jsx';
import Container from '../../shared/components/Container/Container.jsx';
import css from './SharedLayout.module.css';
import HourglassLoader from '../../shared/components/HourglassLoader/HourglassLoader.jsx';

const SharedLayout = ({ children }) => {
  return (
    <Container className={css.container}>
      <Suspense fallback={<HourglassLoader />}>{children}</Suspense>
    </Container>
  );
};

export default SharedLayout;
