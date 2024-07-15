// import { NavLink } from 'react-router-dom';
import css from './GoogleAuth.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { useEffect, useState } from 'react';


const GoogleAuth = () => {
    const [googleAuthUrl, setGoogleAuthUrl] = useState('');

    useEffect(() => {
        const fetchGoogleAuthUrl = async () => {
            try {
                const response = await fetch('https://project6-back.onrender.com/users/get-oauth-url');
                const data = await response.json();
                if (response.ok) {
                    setGoogleAuthUrl(data.data.url);
                } else {
                    console.error('Failed to get Google OAuth URL:', data.message);
                }
            } catch (error) {
                console.error('Error fetching Google OAuth URL:', error);
            }
        };

        fetchGoogleAuthUrl();
    }, []);
        

        return (
              <a className={css.linkGoogle} href={googleAuthUrl}>
                <svg width="20px" height="20px">
                  <use xlinkHref={`${sprite}#icon-icons8-google-48`} />
                </svg>
                Sign in with Google
              </a>
            )
        };

export default GoogleAuth