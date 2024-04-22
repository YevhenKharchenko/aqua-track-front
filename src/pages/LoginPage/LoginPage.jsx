import LoginForm from '../../components/LoginForm/LoginForm';
import DocumentTitle from '../../components/DocumentTitle';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div>
      <DocumentTitle>Contacts App - Login</DocumentTitle>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
