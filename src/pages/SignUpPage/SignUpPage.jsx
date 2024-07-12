import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from './SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <div className={css.backdrop}>
      <Logo />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
