import css from './GoogleAuth.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUserSuccess } from '../../redux/auth/slice';

const GoogleAuth = () => {
  const [googleAuthUrl, setGoogleAuthUrl] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        toast.error(`Error fetching Google OAuth URL: ${error}`, {
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
    const handleGoogleAuth = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      console.log('URL:', location.href);
      console.log('Code:', code);


      if (code) {
        try {
          const response = await axios.post('https://project6-back.onrender.com/users/confirm-oauth', { code });
          const { data } = response;

          console.log('Response:', response);

          if (response.status === 200) {
            toast.success('Successfully authenticated with Google!', {
              duration: 4000,
              position: 'top-center',
              style: {
                textAlign: 'center',
                boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
              },
            });

            dispatch(loginUserSuccess(data.data.accessToken));
            navigate('/tracker');
          } else {
            toast.error(`Failed to confirm Google OAuth: ${data.message}`, {
              duration: 4000,
              position: 'top-center',
              style: {
                textAlign: 'center',
                boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
              },
            });
          }
        } catch (error) {
          toast.error(`Error confirming Google OAuth: ${error}`, {
            duration: 4000,
            position: 'top-center',
            style: {
              textAlign: 'center',
              boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
            },
          });
        }
      }
    };

    handleGoogleAuth();
  }, [location.search, dispatch, navigate]);



  return (
    <a className={css.linkGoogle} href={googleAuthUrl}>
      <svg width="20px" height="20px">
        <use xlinkHref={`${sprite}#icon-icons8-google-48`} />
      </svg>
      Sign in with Google
    </a>
  );
};

export default GoogleAuth;


