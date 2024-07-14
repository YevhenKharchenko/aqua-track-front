import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import css from './SignUpForm.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUpForm = () => {

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
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
    reset();
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

        <div className={css.signupFormPass}>
          <label className={css.label}>Repeat Password:</label>
          <div className={css.signupInputWrap}>
            <input
              className={`${css.signupInput} ${errors.repeatPassword ? css.error : ''}`}
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

        <div className={css.btnWrap}>
          <button className={css.signupBtn} type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div className={css.textWrap}>
        Already have an account?
        <NavLink className={css.linkText} to="/signin">
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default SignUpForm;
