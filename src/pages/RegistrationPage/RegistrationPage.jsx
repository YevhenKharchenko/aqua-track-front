import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import DocumentTitle from '../../components/DocumentTitle';
import css from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <div>
      <DocumentTitle>Contacts App - Registration</DocumentTitle>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
