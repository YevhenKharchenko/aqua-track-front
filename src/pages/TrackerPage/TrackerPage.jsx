import css from './TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import { selectIsLoggedIn } from '../../redux/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations.js';

const TrackerPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    dispatch(refreshUser());
  }

  return (
    <div className={css.container}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};

export default TrackerPage;
