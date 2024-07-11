import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import css from './SignInForm.module.css';
// import { useNavigate } from "react-router-dom";

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
          <input className={css.signupInput} type="email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className={css.signupFormPass}>
          <label className={css.label}>Password:</label>
          <div>
            <input className={css.signupInput}
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className={css.btnWrap}>
        <button className={css.signupBtn} type="submit">Sign In</button>
        </div>
      </form>

      <div className={css.textWrap}>
        Don’t have an account?
        <NavLink className={css.linkText} to="/signup">Sign Up</NavLink>
      </div>
    </div>
  );
};

export default SignInForm;
