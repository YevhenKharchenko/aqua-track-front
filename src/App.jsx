import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';
import { refreshUser, getAllUsers } from './redux/auth/operations.js';
import { selectIsRefreshing, selectIsLoggedIn } from './redux/selectors.js';
import { loginUserSuccess } from './redux/auth/slice.js';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';
import Loader from './shared/components/Loader/Loader.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomePage from './pages/HomePage/HomePage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import SharedLayout from './components/SharedLayout/SharedLayout.jsx';
import ExampleModal from './components/ExampleModal.jsx';

import LogOutModal from './components/LogOutModal/LogOutModal.jsx';

import TrackerPage from './pages/TrackerPage/TrackerPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage.jsx';
import GoogleAuth from './components/GoogleAuth/GoogleAuth.jsx';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getAllUsers());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
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
          element={<RestrictedRoute component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<RestrictedRoute component={<ResetPasswordPage />} />}
        />
        <Route path="/google-auth" component={<GoogleAuth />} />
        <Route
          path="/tracker"
          element={<PrivateRoute redirectTo="/signin" component={<TrackerPage />} />}
        />
        <Route path="/modal" element={<ExampleModal />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
