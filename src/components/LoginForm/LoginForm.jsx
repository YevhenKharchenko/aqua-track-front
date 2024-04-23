import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import css from './LoginForm.module.css';

const FeedbackSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short! Min 8 characters.')
    .max(50, 'Too Long! Max 50 characters.')
    .required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: FeedbackSchema,
    onSubmit: values => {
      dispatch(login(values));
    },
  });

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 7,
        width: '35ch',
      }}
      noValidate
      autoComplete="on"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        autoFocus
        required
        margin="dense"
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        type="email"
        fullWidth
        variant="outlined"
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        type="password"
        fullWidth
        variant="outlined"
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button variant="contained" type="submit">
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
