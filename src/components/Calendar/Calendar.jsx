import { CalendarItem } from '../CalendarItem/CalendarItem';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from 'date-fns';
import css from './Calendar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthWater } from '../../redux/selectors';
import { useEffect } from 'react';
import { getMonthWater } from '../../redux/water/operations';

export const Calendar = ({ currentMonth }) => {
  const dispatch = useDispatch();
  const monthData = useSelector(selectMonthWater);

  useEffect(() => {
    dispatch(getMonthWater(currentMonth));
  }, [dispatch, currentMonth]);

  const days = eachDayOfInterval({
    start: startOfMonth(new Date(currentMonth)),
    end: endOfMonth(new Date(currentMonth)),
  });

  const getDayData = (day) => {
    return monthData.find((data) => isSameDay(new Date(data.date), day));
  };

  return (
    <div>
      <ul className={css.listCalendar}>
        {days.map((day) => {
          return (
            <li className={css.itemCalendar} key={day}>
              <CalendarItem day={day} getDayData={getDayData} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};