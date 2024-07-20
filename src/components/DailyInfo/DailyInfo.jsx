import css from './DailyInfo.module.css';
import { ChooseDate } from '../ChooseDate/ChooseDate.jsx';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import { WaterList } from '../WaterList/WaterList.jsx';
import sprite from '../../assets/icons/sprite.svg';

export function DailyInfo() {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div className={css.wrapper}>
        <ChooseDate />
        <AddWaterBtn
          section="daily"
          className={css.addBtn}
          icon={`${sprite}#icon-plus-40x40`}
          iconClassName={css.icon}
        />
      </div>
      <WaterList />
    </div>
  );
}
