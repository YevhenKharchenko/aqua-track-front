import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import css from './SignInForm.module.css';
import sprite from '../../assets/icons/sprite.svg';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

const SignInForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
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
        console.log('login success');
      })
      .catch(() => {
        console.log('login error');
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

        <div className={css.signupFormEmail}>
          <label className={css.label}>Email:</label>
          <div className={css.signupInputWrap}>
            <input
              className={`${css.signupInput} ${errors.email ? css.error : ''}`}
              type="email"
              name="email"
              placeholder="Enter your email"
              {...register('email')}
            />
          </div>
          {errors.email && <p className={css.errorMessage}>{errors.email.message}</p>}
        </div>

        <div className={css.signupFormPass}>
          <label className={css.label}>Password:</label>
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

        <div className={css.btnWrap}>
          <button className={css.signupBtn} type="submit">
            Sign In
          </button>
        </div>
      </form>

      <GoogleAuth />

      <div className={css.textWrap}>
        Don’t have an account?
        <NavLink className={css.linkText} to="/signup">
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};

export default SignInForm;
