import css from './DailyInfo.module.css';
import { ChooseDate } from '../ChooseDate/ChooseDate.jsx';
import { AddWaterBtn } from '../AddWaterBtn/AddWaterBtn.jsx';
import { WaterList } from '../WaterList/WaterList.jsx';

export function DailyInfo() {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div className={css.wrapper}>
        <ChooseDate />
        <AddWaterBtn section="daily" />
      </div>
      <WaterList />
    </div>
  );
}
