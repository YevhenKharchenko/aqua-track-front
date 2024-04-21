import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <nav className={css.authNav}>
      <NavLink to="/register">Try for free</NavLink>
      <NavLink to="/login">Log In</NavLink>
    </nav>
  );
};

export default AuthNav;
