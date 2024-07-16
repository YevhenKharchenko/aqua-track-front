import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import css from './ResetPasswordForm.module.css';
import sprite from '../../assets/icons/sprite.svg';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    setToken(tokenFromUrl);
  }, [location]);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Repeat password is required'),
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
      const response = await axios.post('https://project6-back.onrender.com/users/reset-password', {
        token,
        password: data.password,
      });

      if (response.status === 200) {
        toast.success(`Password reset successful`, {
          duration: 4000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
        reset();
        navigate('/signin');
      } else {
        toast.error(`Something went wrong. Please try again.`, {
          duration: 4000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${errorMessage}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          textAlign: 'center',
          boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
        },
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className={css.header}>Change the password</h2>

        <div className={css.signupFormPass}>
          <label className={css.label}>New password:</label>
          <div className={css.signupInputWrap}>
            <input
              className={`${css.signupInput} ${errors.password ? css.error : ''}`}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              {...register('password')}
            />
            <svg
              className={css.passwordToggleIcon}
              onClick={togglePasswordVisibility}
              width="20px"
              height="20px"
            >
              <use xlinkHref={`${sprite}#${showPassword ? 'eye' : 'eye-off'}`} />
            </svg>
          </div>
          {errors.password && <p className={css.errorMessage}>{errors.password.message}</p>}
        </div>

        <div className={css.signupFormPass}>
          <label className={css.label}>Repeat new password:</label>
          <div className={css.signupInputWrap}>
            <input
              className={`${css.signupInput} ${errors.repeatPassword ? css.error : ''}`}
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              name="repeatPassword"
              {...register('repeatPassword')}
            />
            <svg
              className={css.passwordToggleIcon}
              onClick={toggleRepeatPasswordVisibility}
              width="20px"
              height="20px"
            >
              <use xlinkHref={`${sprite}#${showRepeatPassword ? 'eye' : 'eye-off'}`} />
            </svg>
          </div>
          {errors.repeatPassword && (
            <p className={css.errorMessage}>{errors.repeatPassword.message}</p>
          )}
        </div>

        <div className={css.btnWrap}>
          <button className={css.signupBtn} type="submit">
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
