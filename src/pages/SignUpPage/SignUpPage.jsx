import { useEffect, useState } from 'react';
import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from './SignUpPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import DocumentTitle from '../../components/DocumentTitle';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const SignUpPage = () => {
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
      <DocumentTitle>{t('aqua track - register')}</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <SignUpForm />
      </div>
      {isWideScreen && <AdvantagesSection />}
    </div>
  );
};

export default SignUpPage;
