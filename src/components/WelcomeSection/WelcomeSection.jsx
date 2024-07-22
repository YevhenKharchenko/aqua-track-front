import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import css from "./WelcomeSection.module.css";
import { useTranslation } from 'react-i18next'; // хук useTranslation


const WelcomeSection = () => {
      const { t } = useTranslation(); //  хук для отримання функції перекладу

  return (
    <div className={css.backdrop}>
      <Logo />
      
      <h3 className={css.welcomeText}>{t('record daily water intake and track')}</h3>
      <h1 className={css.welcomeHeader}>{t('water consumption tracker')}</h1> 
      
      
      <Navigation />
    </div>
  );
};

export default WelcomeSection;
