import css from './TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import DocumentTitle from '../../components/DocumentTitle';
import { selectIsLoggedIn } from '../../redux/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations.js';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // хук useTranslation


const TrackerPage = () => {
  const { t } = useTranslation(); //  хук для отримання функції перекладу

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <div className={css.container}>
      <DocumentTitle>{t('aqua track - main page')}</DocumentTitle>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};

export default TrackerPage;
