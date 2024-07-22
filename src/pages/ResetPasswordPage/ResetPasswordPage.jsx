import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import Logo from '../../components/Logo/Logo';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import DocumentTitle from '../../components/DocumentTitle';
import css from './ResetPasswordPage.module.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const ResetPasswordPage = () => {
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
      <DocumentTitle>{t('aqua track - reset password')}</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <ResetPasswordForm />
      </div>
      {isWideScreen && <AdvantagesSection />}
    </div>
  );
};

export default ResetPasswordPage;
