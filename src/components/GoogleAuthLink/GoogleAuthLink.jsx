
import css from './GoogleAuthLink.module.css';
import sprite from '../../assets/icons/sprite.svg';

const GoogleAuthLink = ({ googleAuthUrl }) => {
  return (
    <a className={css.linkGoogle} href={googleAuthUrl}>
      <svg width="20px" height="20px">
        <use xlinkHref={`${sprite}#icon-icons8-google-48`} />
      </svg>
      Sign in with Google
    </a>
  );
};

export default GoogleAuthLink;