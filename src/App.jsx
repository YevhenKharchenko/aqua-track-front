import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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


function App() {
  return (
    <SharedLayout>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          // element={<RestrictedRoute redirectTo="/tracker" component={<SignUpPage />}
          // />}
          element={<SignUpPage />}
        />
        <Route
          path="/signin"
          // element={<RestrictedRoute redirectTo="/tracker" component={<SignInPage />} />}
          element={<SignInPage />}
        />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/modal" element={<ExampleModal />} />
        <Route path="/logout" element={<LogOutModal />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
