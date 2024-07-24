import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDate, selectWaterPerMonth } from '../../redux/selectors';
import { fetchWaterPerMonth, fetchWaterPerDay } from '../../redux/water/operations';
import { useAuth } from '../../hooks/useAuth';
import { setActiveDay } from '../../redux/water/slice';
import { formatDateToDayMonthYear } from '../../helpers/formatDateToDayMonthYear.js';
import { convertDateFormatForActiveDay } from '../../helpers/convertDateFormatForActiveDay.js';
import { isDateAfterToday } from '../../helpers/isDateAfterToday.js';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const daysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);

  const waterPerMonth = useSelector(selectWaterPerMonth);

  const activeDay = useSelector(state => state.water.activeDay);

  const user = useAuth().user;

  const calculateFeasibility = dayData => {
    if (!dayData || dayData.length === 0) return 0;

    let totalValue = 0;
    dayData.forEach(record => {
      totalValue += record.amount;
    });

    // const userWaterRate = Number(user?.waterNorma) * 1000 || 1500;
    const userWaterRate = Number(user?.waterNorma) * 1000;

    if (totalValue >= userWaterRate) return 100;

    const feasibility = (totalValue / userWaterRate) * 100;

    return Math.round(feasibility);
  };

  const month = new Date(currentDate).getMonth();
  const year = new Date(currentDate).getFullYear();
  const numberOfDays = daysInMonth(month, year);

  // я додав, це обов'язкова функція для того щоб була універсальна дата для будь-яких локалізацій браузера
  function formatDateForDay(originalDate) {
    const [day, month, year] = originalDate.split('.');
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  function convertDateFormat(dateString) {
    const [day, month, year] = dateString.split('.');

    return `${day}-${month}-${year}`;
  }

  function findObjectByDate(arr = [], targetDate) {
    return arr.filter(obj => obj.date === targetDate);
  }
  //
  const localDate = new Date(currentDate).toLocaleDateString();
  const formattedDateForMonth = formatDateToDayMonthYear(localDate);

  useEffect(() => {
    // я додав
    dispatch(fetchWaterPerMonth(formattedDateForMonth));
    dispatch(fetchWaterPerDay(formattedDateForMonth));
    //
    // код Андрія
    // dispatch(fetchWaterPerMonth(localDate));
  }, [dispatch, formattedDateForMonth]);

  const daysArray = Array.from({ length: numberOfDays }, (_, index) => index + 1);

  const handleDayClick = day => {
    const formattedDay = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(
      2,
      '0'
    )}.${year}`;

    // я додав
    const formattedDateForDay = formatDateForDay(formattedDay);

    dispatch(setActiveDay(formattedDay));
    dispatch(fetchWaterPerDay(formattedDateForDay));
    //

    // код Андрія
    // dispatch(setActiveDay(formattedDay));
    // dispatch(fetchWaterPerDay(formattedDay));
  };

  const formattedActiveDay = convertDateFormatForActiveDay(activeDay);

  return (
    <div data-tour="calendar-step" className={css.container}>
      <ul className={css.list}>
        {daysArray.map(day => {
          const dayKey = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(
            2,
            '0'
          )}.${year}`;

          const formattedDayKey = convertDateFormat(dayKey);

          const dayData = findObjectByDate(waterPerMonth, formattedDayKey) || [];
          const feasibility = calculateFeasibility(dayData);

          const isDisabled = isDateAfterToday(dayKey);

          return (
            <li key={day} className={css.item}>
              <CalendarItem
                key={day}
                day={day}
                waterData={dayData}
                feasibility={feasibility}
                onClick={() => handleDayClick(day)}
                isActive={dayKey === formattedActiveDay}
                isDisabled={isDisabled}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Calendar;
