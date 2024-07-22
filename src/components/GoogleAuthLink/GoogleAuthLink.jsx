
import css from './GoogleAuthLink.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const GoogleAuthLink = ({ googleAuthUrl }) => {
  const { t } = useTranslation(); //  хук для отримання функції перекладу
  return (
    <a className={css.linkGoogle} href={googleAuthUrl}>
      <svg width="20px" height="20px">
        <use xlinkHref={`${sprite}#icon-icons8-google-48`} />
      </svg>
      {t('sign in with Google')}
    </a>
  );
};

export default GoogleAuthLink;