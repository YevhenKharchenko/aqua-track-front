import css from './TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';

const TrackerPage = () => {
  return (
    <div className={css.container}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};

export default TrackerPage;
