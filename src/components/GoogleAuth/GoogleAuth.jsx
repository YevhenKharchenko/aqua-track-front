
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUserSuccess } from '../../redux/auth/slice';
import { useNavigate } from 'react-router-dom';
import GoogleAuthLink from '../GoogleAuthLink/GoogleAuthLink';

const GoogleAuth = () => {
  const [googleAuthUrl, setGoogleAuthUrl] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoogleAuthUrl = async () => {
      try {
        const response = await axios.get('https://project6-back.onrender.com/users/get-oauth-url');
        const { data } = response;
        if (response.status === 200) {
          setGoogleAuthUrl(data.data.url);
        } else {
          toast.error(`Failed to get Google OAuth URL: ${data.message}`, {
            duration: 4000,
            position: 'top-center',
            style: {
              textAlign: 'center',
              boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
            },
          });
        }
      } catch (error) {
        toast.error(`Error fetching Google OAuth URL: ${error.message}`, {
          duration: 4000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      }
    };

    fetchGoogleAuthUrl();
  }, []);

  useEffect(() => {
    const handleGoogleRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) return;

      try {
        const response = await axios.post('https://project6-back.onrender.com/users/confirm-oauth', { code });
        const { data } = response;

        if (response.status === 200) {
          const { accessToken, user } = data.data;
          dispatch(loginUserSuccess({ token: accessToken, user }));
          localStorage.setItem('accessToken', accessToken);

          toast.success('Successfully logged in with Google OAuth!', {
            duration: 4000,
            position: 'top-center',
            style: {
              textAlign: 'center',
              boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
            },
          });
          navigate('/tracker');
        } else {
          toast.error(`Failed to log in with Google OAuth: ${data.message}`, {
            duration: 4000,
            position: 'top-center',
            style: {
              textAlign: 'center',
              boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
            },
          });
        }
      } catch (error) {
        console.error(`Error in handleGoogleRedirect: ${JSON.stringify(error.response?.data || error.message)}`);
        toast.error(`Error logging in with Google OAuth: ${error.response?.data?.message || error.message}`, {
          duration: 4000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      }
    };

    handleGoogleRedirect();
  }, [dispatch, navigate]);

  return googleAuthUrl ? <GoogleAuthLink googleAuthUrl={googleAuthUrl} /> : null;
};

export default GoogleAuth;
