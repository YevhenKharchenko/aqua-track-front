import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import DocumentTitle from '../../components/DocumentTitle.jsx';
import css from './HomePage.module.css';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const HomePage = () => {
    const { t } = useTranslation(); //  хук для отримання функції перекладу
  return (
    <div className={css.container}>
      <DocumentTitle>{t('aqua track - home page')}</DocumentTitle>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};

export default HomePage;
