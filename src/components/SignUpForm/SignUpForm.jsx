import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import css from './SignUpForm.module.css';
import sprite from '../../assets/icons/sprite.svg';

const SignUpForm = () => {

// const dispatch = useDispatch();

// const handleSubmit = (e) => {
//   e.preventDefault();
//   const form = e.target;

//   dispatch(
//     register({
//       name: form.elements.name.value,
//       email: form.elements.email.value,
//       password: form.elements.password.value,
//     })
//   );

//   form.reset();
// };

// if (isLoginSuccess) {
  //     return <Navigate to="/profile" replace />;
  //   }
  
  // fetch('https://your-api-url.com/register', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(formData),
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error('Error:', error));
  //   };
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const onSubmit = data => {
    const { email, password } = data;
    const formData = { email, password };
    console.log(formData);
  };

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

        <div className={css.signupFormPass}>
          <label className={css.label}>Repeat Password:</label>
          <div className={css.signupInputWrap}>
            <input
              className={`${css.signupInput} ${errors.repeatPassword ? css.error : ''}`}
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              {...register('repeatPassword', {
                required: 'Repeat password is required',
                validate: value => value === watch('password') || 'Passwords do not match',
              })}
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
