import css from './WaterList.module.css';
import WaterItem from '../WaterItem/WaterItem';
const WaterList = () => {
  return (
    <ul className={css.waterInfoList}>
      <li className={css.waterItem}>
        <WaterItem />
      </li>
      <li className={css.waterItem}>
        <WaterItem />
      </li>
      <li className={css.waterItem}>
        <WaterItem />
      </li>
    </ul>
  );
};

export default WaterList;
