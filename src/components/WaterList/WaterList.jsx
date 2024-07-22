import { useWater } from '../../hooks/useWater.jsx';
import { WaterItem } from '../WaterItem/WaterItem.jsx';
import css from './WaterList.module.css';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // хук useTranslation


export function WaterList() {
  // я додав
  const { waterRecord = [] } = useWater().waterPerDay;
          const { t } = useTranslation(); //  хук для отримання функції перекладу

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

  return (
    <div ref={useHorizontalScroll()} className={css.waterList}>
      {waterRecord.length > 0 ? (
        waterRecord.map(value => {
          return <WaterItem key={value._id} item={value} />;
        })
      ) : (
        <div className={css.empty}>
          <p>🌵{t('it is as dry as a desert')}</p>
        </div>
      )}
    </div>
  );
}
