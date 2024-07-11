import Logo from '../../components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';
import css from './SignInPage.module.css';

const SignInPage = () => {
  return (
    <div className={css.backdrop}>
      <Logo />
      <SignInForm />
    </div>
  );
};

export default SignInPage;
