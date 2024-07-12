import { useState } from 'react';
import { CalendarPagination } from '../CalendarPagination/CalendarPagination';
import { Calendar } from '../Calendar/Calendar';
import css from './MonthInfo.module.css';

export const MonthInfo = () => {
  // За замовчуванню обрана дата дорівнює поточному місяцю
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isActive, setIsActive] = useState(true);
  return (
    <div className={css.calendar}>
      <CalendarPagination
        setIsActive={setIsActive}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        isActive={isActive}
      />

      {isActive ? <Calendar currentMonth={currentDate} /> : <Chart />}
    </div>
  );
};