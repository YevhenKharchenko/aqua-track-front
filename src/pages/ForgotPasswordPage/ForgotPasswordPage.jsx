import { useEffect, useState } from 'react';
import css from './ForgotPasswordPage.module.css';
import Logo from '../../components/Logo/Logo';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1440);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={css.wrapper}>
      <div className={css.backdrop}>
       <Logo />
      <ForgotPasswordForm /> 
      
    </div>
    {isWideScreen && <AdvantagesSection />}
    </div>
  );
};

export default ForgotPasswordPage;
