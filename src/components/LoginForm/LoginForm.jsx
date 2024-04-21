import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import Button from '@mui/material/Button';
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
      <Form className={css.form}>
        <label className={css.label}>
          Email
          <Field className={css.input} type="email" name="email" placeholder="Enter email"></Field>
          <ErrorMessage className={css.error} name="email" component="span" />
        </label>
        <label className={css.label}>
          Password
          <Field
            className={css.input}
            type="password"
            name="password"
            placeholder="Enter password"
          ></Field>
          <ErrorMessage className={css.error} name="password" component="span" />
        </label>

        <Button variant="contained" type="submit">
          Log In
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
