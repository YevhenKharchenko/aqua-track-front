import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

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
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div>
          <h2>Sign Up</h2>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password:</label>
          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              {...register('password', { required: 'Password is required' })}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>Repeat Password:</label>
          <div>
            <input
              type={showRepeatPassword ? 'text' : 'password'}
              {...register('repeatPassword', {
                required: 'Repeat password is required',
                validate: value => value === watch('password') || 'Passwords do not match',
              })}
            />
            <button type="button" onClick={toggleRepeatPasswordVisibility}>
              {showRepeatPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <div>
        Already have account?
        <NavLink to="/signin">Sign In</NavLink>
      </div>
    </div>
  );
};

export default SignUpForm;