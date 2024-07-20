import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import DocumentTitle from '../../components/DocumentTitle.jsx';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <DocumentTitle>Aqua Track - Home Page</DocumentTitle>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};

export default HomePage;
