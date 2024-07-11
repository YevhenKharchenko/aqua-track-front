import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const SignInForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    // Отправляем только email и password
    const { email, password } = data;
    const formData = { email, password };
    console.log(formData);

    // const response = await FakeAPI.login(values);
    // if (response.success) {
    //   navigate("/profile", { replace: true });
    // }
    
    
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          {...register('email', { required: 'Email is required' })} 
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      
      <div>
        <label>Password:</label>
        <div>
          <input 
            type={showPassword ? 'text' : 'password'} 
            {...register('password', { required: 'Password is required' })} 
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignInForm