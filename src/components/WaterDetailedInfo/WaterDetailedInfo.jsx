import UserPanel from '../UserPanel/UserPanel';
import css from './WaterDetailedInfo.module.css';
const WaterDetailedInfo = () => {
  return (
    <div className={css.waterDetailInfo}>
      <UserPanel />
      {/* <DailyInfo />
		<MonthInfo/>  */}
    </div>
  );
};

export default WaterDetailedInfo;
