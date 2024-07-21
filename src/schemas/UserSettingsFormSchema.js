import * as yup from 'yup';

export const userSettingsFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your name!')
    .min(2, 'Name must be at least 2 characters long.')
    .max(20, 'Name must be less than 20 characters long.'),
  email: yup
    .string()
    .required('Please enter your email address.')
    .matches(/^[^@]+@[^@]+\.[^@]+$/, 'Please enter a valid email address.')
    .email('Invalid email.'),
  gender: yup.string().oneOf(['woman', 'man', ''], 'Gender must be either "woman" or "man".'),
  weight: yup
    .number()
    .typeError('Weight must be a number.')
    .min(10, 'Weight must be 10 or more.')
    .max(180, 'Weight must be less than or equal to 180 kg.'),
  sportTime: yup
    .number()
    .typeError('Active sport time must be a number.')
    .min(0, 'Active sport time must be a positive number.')
    .max(14, 'Active sport time must be less than or equal to 14 hours.'),
  waterNorma: yup
    .number()
    .typeError('Daily water consumption must be a number.')
    .positive('Daily water consumption must be a positive number.')
    .max(15, 'Daily water consumption must be less than or equal to 15 l.'),
});
