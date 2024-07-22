import css from './ForgotPasswordForm.module.css';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next'; // Імпортуйте хук useTranslation

const ForgotPasswordForm = () => {
  const { t } = useTranslation(); // Використовуйте хук для отримання функції перекладу
  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email format')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Invalid email format')
    .required('Email is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async data => {
    try {
      const response = await axios.post(
        'https://project6-back.onrender.com/users/send-reset-email',
        {
          email: data.email,
        }
      );
      if (response.status === 200) {
        toast.success(`Check your email for the password reset link.`, {
          duration: 4000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      }
    } catch (error) {
      toast.error(`Failed to send reset password email. Please try again later.`, {
        duration: 4000,
        position: 'top-center',
        style: {
          textAlign: 'center',
          boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
        },
      });
    }
    reset();
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.header}>{t('account recovery')}</h2>

        <div className={css.formGroup}>
          <label className={css.label}>{t('enter your email')}:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.email ? css.error : ''}`}
              type="text"
              name="email"
              placeholder="Enter your email"
              {...register('email')}
            />
          </div>
          {errors.email && <p className={css.errorMessage}>{errors.email.message}</p>}
        </div>
        <div className={css.buttonWrapper}>
          <button className={css.submitButton} type="submit">
            {t('send')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;

