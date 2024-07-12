import css from './TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
// import WaterDetailedInfo

const TrackerPage = () => {
  return (
    <div className={css.container}>
      <WaterMainInfo />
    </div>
  );
};

export default TrackerPage;
