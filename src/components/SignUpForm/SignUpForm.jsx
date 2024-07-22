import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate  } from 'react-router-dom';
import css from './SignUpForm.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

const SignUpForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email format')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Invalid email format')
    .required('Email is required'),
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

  const onSubmit = (data) => {
    dispatch(
      registerUser({
        email: data.email,
        password: data.password,
      })
    );
    toast.success(`Successfully created user!`, {
      duration: 4000,
      position: 'top-center',
      style: {
        textAlign: 'center',
        boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
      },
    });
    reset();
    navigate('/signin');
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
        <h2 className={css.header}>Sign Up</h2>

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

        <div className={css.formGroupPassword}>
          <label className={css.label}>Repeat Password:</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.repeatPassword ? css.error : ''}`}
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder="Repeat password"
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

        <div className={css.buttonWrapper}>
          <button className={css.submitButton} type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <GoogleAuth linkText={"Sign up with Google"}/>
      <div className={css.textWrapper}>
        Already have an account?
        <NavLink className={css.link} to="/signin">
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default SignUpForm;
