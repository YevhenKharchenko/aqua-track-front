import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <WelcomeSection />
      <AdvantagesSection />
      <WaterDetailedInfo />
    </div>
  );
};

export default HomePage;
