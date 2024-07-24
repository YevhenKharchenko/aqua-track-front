import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import css from './SignInForm.module.css';
import sprite from '../../assets/icons/sprite.svg';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

const SignInForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      })
    )
      .unwrap()
      .then(() => {
        toast.success(`You are successfully logged in!`, {
          duration: 4000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .catch(() => {
        toast.error(`The email or password you entered is incorrect. Please try again.`, {
          duration: 4000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      });
    reset();
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.header}>Sign In</h2>

        <div className={css.formGroup}>
          <label className={css.label}>Email:</label>
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

        <div className={css.formGroupPassword}>
          <label className={css.label}>Password:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.password ? css.error : ''}`}
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

        <div className={css.buttonWrapper}>
          <button className={css.submitButton} type="submit">
            Sign In
          </button>
        </div>
      </form>

      <GoogleAuth linkText={'Sign in with Google'} />

      <div className={css.textWrapper}>
        Don’t have an account?
        <NavLink className={css.link} to="/signup">
          Sign Up
        </NavLink>
      </div>
      <NavLink className={css.forgotPassword} to="/request-reset">
        Forgot password?
      </NavLink>
    </div>
  );
};

export default SignInForm;
