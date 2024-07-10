import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout/Layout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomePage from './pages/HomePage/HomePage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';

function App() {
  return (
    <Layout>
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
