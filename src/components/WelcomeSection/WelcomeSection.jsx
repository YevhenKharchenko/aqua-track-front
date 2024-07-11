import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import css from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  return (
    <div className={css.backdrop}>
      <Logo />
      
      <h3>Record daily water intake and track</h3>
      <h1>Water consumption tracker</h1> 
      
      
      <Navigation />
    </div>
  );
};

export default WelcomeSection;
