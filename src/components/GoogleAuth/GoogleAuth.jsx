import css from './GoogleAuth.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserGoogle } from '../../redux/auth/operations';

const GoogleAuth = ({ linkText }) => {
  const [googleAuthUrl, setGoogleAuthUrl] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
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

      if (code && !isAuthorizing) {
        setIsAuthorizing(true);
        try {
          const response = await axios.post(
            'https://project6-back.onrender.com/users/confirm-oauth',
            { code }
          );

          if (response.status === 200) {
            const { accessToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            dispatch(loginUserGoogle());

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
            throw new Error(`Failed to log in with Google OAuth: ${response.data.message}`);
          }
        } catch (error) {
          throw new Error(
            `Error logging in with Google OAuth: ${error.response?.data?.message || error.message}`
          );
        } finally {
          setIsAuthorizing(false);
        }
      }
    };

    handleGoogleRedirect();
  }, [dispatch, navigate, isAuthorizing]);

  if (isLoggedIn || isAuthorizing) {
    return null;
  }

  return (
    <a className={css.linkGoogle} href={googleAuthUrl}>
      <svg width="20px" height="20px">
        <use xlinkHref={`${sprite}#icon-icons8-google-48`} />
      </svg>
      { linkText }
    </a>
  );
};

export default GoogleAuth;
