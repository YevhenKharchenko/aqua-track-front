import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import css from './SignInForm.module.css';
import sprite from '../../assets/icons/sprite.svg';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = data => {
    const { email, password } = data;
    const formData = { email, password };
    console.log(formData);

    // if (isLoginSuccess) {
    //     return <Navigate to="/profile" replace />;
    //   }

    // fetch('https://your-api-url.com/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
  };

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
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
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
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
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
