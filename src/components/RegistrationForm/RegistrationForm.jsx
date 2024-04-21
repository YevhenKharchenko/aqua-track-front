import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import css from './RegistrationForm.module.css';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    // .matches(/^(?!-)[-\d]+(?<!-)$/, 'Wrong format')
    .required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
      <Form className={css.form}>
        <label className={css.label}>
          Username
          <Field className={css.input} type="text" name="name" placeholder="Enter username"></Field>
          <ErrorMessage className={css.error} name="name" component="span" />
        </label>
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
          Register
        </Button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
