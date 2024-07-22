import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';
import { refreshUser, getAllUsers } from './redux/auth/operations.js';
import { selectIsRefreshing } from './redux/selectors.js';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import SharedLayout from './components/SharedLayout/SharedLayout.jsx';
import GoogleAuth from './components/GoogleAuth/GoogleAuth.jsx';
import HourglassLoader from './shared/components/HourglassLoader/HourglassLoader.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage.jsx'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage/ForgotPasswordPage.jsx'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage/ResetPasswordPage.jsx'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getAllUsers());
  }, [dispatch]);

  return isRefreshing ? (
    <HourglassLoader />
  ) : (
    <SharedLayout>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={<RestrictedRoute redirectTo="/tracker" component={<SignUpPage />} />}
        />
        <Route
          path="/signin"
          element={<RestrictedRoute redirectTo="/tracker" component={<SignInPage />} />}
        />
        <Route
          path="/request-reset"
          element={<RestrictedRoute redirectTo="/tracker" component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<RestrictedRoute redirectTo="/tracker" component={<ResetPasswordPage />} />}
        />
        <Route path="/google-auth" element={<GoogleAuth />} />
        <Route
          path="/tracker"
          element={<PrivateRoute redirectTo="/signin" component={<TrackerPage />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
