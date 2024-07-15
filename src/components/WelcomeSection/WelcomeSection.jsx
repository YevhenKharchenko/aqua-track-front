import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import css from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  return (
    <div className={css.backdrop}>
      <Logo />
      
      <h3 className={css.welcomeText}>Record daily water intake and track</h3>
      <h1 className={css.welcomeHeader}>Water consumption tracker</h1> 
      
      
      <Navigation />
    </div>
  );
};

export default WelcomeSection;
