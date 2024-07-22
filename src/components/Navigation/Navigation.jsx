import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const Navigation = () => {
  const { t } = useTranslation(); //  хук для отримання функції перекладу
  return (
    <div className={css.backdrop}>
      <nav className={css.navlist}>
        <NavLink className={css.navButtonSignup} to="/signup">
          {t('try tracker')}
        </NavLink>
        <NavLink className={css.navButtonSignin} to="/signin">
          {t('sign in')}
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
