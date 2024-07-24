import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.notFoundWrapper}>
      <p className={css.text}>Page Not Found</p>
      <Link className={css.link} to="/">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
