import css from './Logo.module.css';

const Logo = () => {
  return (
    <div>
      <a data-tour="welcome-step" className={css.logo} href="https://aqua-track-front.vercel.app/">
        AquaTrack
      </a>
    </div>
  );
};

export default Logo;
