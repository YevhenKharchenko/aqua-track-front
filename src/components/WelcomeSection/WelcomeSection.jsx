import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const WelcomeSection = () => {
  return (
    <div>
      <Logo />
      <h3>Record daily water intake and track</h3>
      <h1>Water consumption tracker</h1>
      <Navigation />

      {/* <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes> */}
    </div>
  );
};

export default WelcomeSection;
