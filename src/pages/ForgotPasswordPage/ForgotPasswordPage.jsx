import { useEffect, useState } from 'react';
import css from './ForgotPasswordPage.module.css';
import Logo from '../../components/Logo/Logo';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import DocumentTitle from '../../components/DocumentTitle';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const ForgotPasswordPage = () => {
  const { t } = useTranslation(); //  хук для отримання функції перекладу

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
      <DocumentTitle>{t('aqua track - request reset password')}</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <ForgotPasswordForm />
      </div>
      {isWideScreen && <AdvantagesSection />}
    </div>
  );
};

export default ForgotPasswordPage;
