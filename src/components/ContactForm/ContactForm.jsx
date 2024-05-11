import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: FeedbackSchema,
    onSubmit: (values, actions) => {
      dispatch(addContact(values));
      actions.resetForm();
    },
  });

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
      }}
      noValidate
      autoComplete="on"
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h5" component="p">
        Create contact:
      </Typography>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        type="text"
        variant="outlined"
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        sx={{
          width: 300,
        }}
        size="small"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="tel"
        name="number"
        label="Number"
        value={formik.values.number}
        onChange={formik.handleChange}
        type="tel"
        variant="outlined"
        error={formik.touched.number && Boolean(formik.errors.number)}
        helperText={formik.touched.number && formik.errors.number}
        sx={{
          width: 300,
        }}
        size="small"
      />
      <Button variant="contained" type="submit">
        Add contact
      </Button>
    </Box>
  );
};

export default ContactForm;
