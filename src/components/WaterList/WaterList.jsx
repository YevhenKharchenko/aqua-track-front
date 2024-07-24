import { useWater } from '../../hooks/useWater.jsx';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/selectors.js';
import { WaterItem } from '../WaterItem/WaterItem.jsx';
import Loader from '../../shared/components/Loader/Loader.jsx';
import css from './WaterList.module.css';

export function WaterList() {
  const loading = useSelector(selectLoading);
  // я додав
  const { waterPerDay } = useWater();
  const { waterRecord = [] } = waterPerDay || {};
  //

  // код Андрія
  // const { waterRecord } = useWater().waterPerDay;

  function useHorizontalScroll() {
    const elRef = useRef();
    useEffect(() => {
      const el = elRef.current;
      if (el) {
        const onWheel = e => {
          if (e.deltaY == 0) return;
          e.preventDefault();
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: 'smooth',
          });
        };
        el.addEventListener('wheel', onWheel);
        return () => el.removeEventListener('wheel', onWheel);
      }
    }, []);
    return elRef;
  }

  const scrollRef = useHorizontalScroll();

  return (
    <div data-tour="records-list-step" ref={scrollRef} className={css.waterList}>
      {loading ? (
        <Loader />
      ) : waterRecord.length > 0 ? (
        waterRecord.map(value => <WaterItem key={value._id} item={value} />)
      ) : (
        <div className={css.empty}>
          <p>🌵It is as dry as a desert</p>
        </div>
      )}
    </div>
  );
}
