import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addContact } from '../../redux/contacts/operations';
import css from './ContactForm.module.css';

const initialValues = {
  name: '',
  number: '',
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short! Min 3 characters.')
    .max(50, 'Too Long! Max 50 characters.')
    .required('Required'),
  number: Yup.string()
    .min(7, 'Too Short! Min 7 digits.')
    .max(12, 'Too Long! Max 12 digits.')
    .matches(/^(?!-)[-\d]+(?<!-)$/, "Wrong format, only digits or '-' allowed")
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
        <Typography variant="h5" component="p">
          Create contact:
        </Typography>
        <label className={css.label}>
          <Field
            type="text"
            name="name"
            className={css.input}
            placeholder="Enter contact name"
          ></Field>
          <ErrorMessage name="name" component="span" className={css.error} />
        </label>
        <label className={css.label}>
          <Field
            type="tel"
            name="number"
            className={css.input}
            placeholder="Enter contact number"
          ></Field>
          <ErrorMessage name="number" component="span" className={css.error} />
        </label>

        <Button variant="contained" type="submit">
          Add contact
        </Button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
