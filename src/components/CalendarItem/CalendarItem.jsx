import toast from 'react-hot-toast';
import { selectDesiredVolume, selectWaterDate } from '../../redux/selectors';
import { getDayWater } from '../../redux/water/operations';
import css from './CalendarItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { format, isSameDay } from 'date-fns';

export const CalendarItem = ({ day, getDayData }) => {
  const dispatch = useDispatch();
  const waterDate = useSelector(selectWaterDate);
  const waterData = getDayData(day);
  const userNorma = useSelector(selectDesiredVolume);
  let percentage = 0;

  if (waterData) {
    const consumption = waterData.totalDayWater || 0;
    percentage = Math.floor(Math.min((consumption / userNorma) * 100, 100));
  }

  const handleDayClick = () => {
    const timezoneOffset = new Date().getTimezoneOffset();
    const utcDate = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate()
    ).getTime();

    const offset = timezoneOffset * 60 * 1000;

    const dateWithOffset = utcDate - offset;

    if (dateWithOffset > Date.now() - offset)
      return toast.error('Can`t get water from the future.', {
        duration: 5000,
        position: 'top-center',
        style: {
          textAlign: 'center',
          boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
        },
      });

    if (isSameDay(waterDate, utcDate - offset))
      return toast.error(
        `Your water is already from ${format(new Date(waterDate), 'd, MMMM')}`,
        {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        }
      );

    dispatch(getDayWater(dateWithOffset));
  };
  const isFullConsumption = percentage === 100;
  const isToday = isSameDay(day, new Date());

  const isSelected = isSameDay(day, waterDate);
  const getDayStyles = (isFullConsumption, isToday, isSelected) => {
    if (isFullConsumption && isToday) {
      return {
        backgroundColor: '#9be1a0',
        color: '#323F47',
        border: '2px solid #323F47',
      };
    }
    if (isFullConsumption) {
      return {
        backgroundColor: '#9be1a0',
      };
    }
    if (isToday) {
      return {
        backgroundColor: '#323F47',
        color: '#9BE1A0',
      };
    }
    if (isSelected) {
      return {
        border: '2px solid #9BE1A0',
      };
    }

    return {};
  };

  const styles = getDayStyles(isFullConsumption, isToday, isSelected);

  return (
    <div>
      <button
        className={css.button}
        style={{ ...styles }}
        onClick={() => {
          handleDayClick();
        }}
      >
        <div className={css.number}>{day.getDate()}</div>
      </button>
      <div className={css.percentage}>{percentage}%</div>
    </div>
  );
};