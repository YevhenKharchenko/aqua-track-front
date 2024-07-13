import ChooseData from '../ChooseDate/ChooseData';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

const DailyInfo = () => {
  return (
    <div>
      <div className={css.thumb}>
        <ChooseData />
        {/* <AddWaterButton/> */}
      </div>
      <WaterList />
    </div>
  );
};
export default DailyInfo;
