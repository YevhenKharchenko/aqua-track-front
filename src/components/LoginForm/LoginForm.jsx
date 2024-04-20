import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import css from './LoginForm.module.css';

const initialValues = {
  email: '',
  password: '',
};

const FeedbackSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    // .matches(/^(?!-)[-\d]+(?<!-)$/, 'Wrong format')
    .required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
      <Form>
        <label>
          Email
          <Field type="email" name="email" placeholder=""></Field>
          <ErrorMessage name="email" component="span" />
        </label>
        <label>
          Password
          <Field type="password" name="password" placeholder=""></Field>
          <ErrorMessage name="password" component="span" />
        </label>

        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
