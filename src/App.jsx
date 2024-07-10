import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout/Layout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));

function App() {
  return (
    <Layout>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={<RestrictedRoute redirectTo="/contacts" component={<RegistrationPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
