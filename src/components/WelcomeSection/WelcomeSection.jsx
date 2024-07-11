import Logo from '../Logo/Logo';
import {  Link } from 'react-router-dom';

const WelcomeSection = () => {
  return (
    <div>
      <Logo />
      <h3>Record daily water intake and track</h3>
      <h1>Water consumption tracker</h1>
      <nav>
        <Link to="/signup">Try tracker</Link>
        <Link to="/signin">Sign In</Link>
      </nav>

      {/* <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes> */}
    </div>
  );
};

export default WelcomeSection;
