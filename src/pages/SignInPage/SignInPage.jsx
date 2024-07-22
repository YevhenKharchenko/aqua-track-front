import { useEffect, useState } from 'react';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import Logo from '../../components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';
import DocumentTitle from '../../components/DocumentTitle';
import css from './SignInPage.module.css';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const SignInPage = () => {
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
      <DocumentTitle>{t('aqua track - login')}</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <SignInForm />
      </div>
      {isWideScreen && <AdvantagesSection />}
    </div>
  );
};

export default SignInPage;
