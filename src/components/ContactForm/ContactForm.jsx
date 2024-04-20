import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import css from './ContactForm.module.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const initialValues = {
  name: '',
  number: '',
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  number: Yup.string()
    .min(7, 'Too Short!')
    .max(12, 'Too Long!')
    .matches(/^(?!-)[-\d]+(?<!-)$/, 'Wrong format, only digits allowed')
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
      <Form className={css.form}>
        <label className={css.label}>
          Name
          <Field type="text" name="name" className={css.input} placeholder="John Doe"></Field>
          <ErrorMessage name="name" component="span" className={css.error} />
        </label>
        <label className={css.label}>
          Number
          <Field type="tel" name="number" className={css.input} placeholder="123-45-67"></Field>
          <ErrorMessage name="number" component="span" className={css.error} />
        </label>

        <Stack spacing={2} direction="row">
          <Button variant="contained" type="submit">
            Add contact
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};

export default ContactForm;
