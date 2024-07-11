import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  return <div>RestrictedRoute
    <SignUpPage />
  </div>;
};
