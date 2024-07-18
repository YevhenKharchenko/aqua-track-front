import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { selectCurrentDate, selectWaterPerMonth } from '../../redux/selectors';
import { fetchWaterPerMonth, fetchWaterPerDay } from '../../redux/water/operations';
import { useAuth } from '../../hooks/useAuth';
import { setActiveDay } from '../../redux/water/slice';

const daysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);

  // я додав
  const waterPerMonth = useSelector(selectWaterPerMonth) || [];
  //

  // код Андрія
  // const waterPerMonth = useSelector(selectWaterPerMonth);

  const activeDay = useSelector(state => state.water.activeDay);

  const user = useAuth().user;

  const calculateFeasibility = dayData => {
    if (!dayData || dayData.length === 0) return 0;

    let totalValue = 0;
    dayData.forEach(record => {
      totalValue += record.waterValue;
    });

    const userWaterRate = Number(user.waterRate) * 1000;
    if (totalValue >= userWaterRate) return 100;

    const feasibility = (totalValue / userWaterRate) * 100;
    return Math.round(feasibility);
  };

  const month = new Date(currentDate).getMonth();
  const year = new Date(currentDate).getFullYear();
  const numberOfDays = daysInMonth(month, year);

  // я додав, це обов'язкова функція для того щоб була універсальна дата для будь-яких локалізацій браузера
  function formatDateForMonth(originalDate) {
    if (!originalDate || typeof originalDate !== 'string') {
      throw new Error('Invalid date format');
    }

    let dateParts;
    if (originalDate.includes('/')) {
      dateParts = originalDate.split('/');
      if (dateParts.length !== 3) {
        throw new Error('Date must be in MM/DD/YYYY format');
      }
      const [month, day, year] = dateParts;
      const paddedMonth = month.padStart(2, '0');
      const paddedDay = day.padStart(2, '0');
      return `${paddedDay}-${paddedMonth}-${year}`;
    } else if (originalDate.includes('.')) {
      dateParts = originalDate.split('.');
      if (dateParts.length !== 3) {
        throw new Error('Date must be in DD.MM.YYYY format');
      }
      const [day, month, year] = dateParts;
      const paddedMonth = month.padStart(2, '0');
      const paddedDay = day.padStart(2, '0');
      return `${paddedDay}-${paddedMonth}-${year}`;
    } else {
      throw new Error('Date format not recognized. Use MM/DD/YYYY or DD.MM.YYYY');
    }
  }

  function formatDateForDay(originalDate) {
    const [day, month, year] = originalDate.split('.');
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }
  //

  useEffect(() => {
    const localDate = new Date(currentDate).toLocaleDateString();

    // я додав
    console.log(localDate);
    const formattedDateForMonth = formatDateForMonth(localDate);
    console.log(formattedDateForMonth);
    dispatch(fetchWaterPerMonth(formattedDateForMonth));
    //

    // код Андрія
    // dispatch(fetchWaterPerMonth(localDate));
  }, [dispatch, currentDate]);

  const daysArray = Array.from({ length: numberOfDays }, (_, index) => index + 1);

  const handleDayClick = day => {
    const formattedDay = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(
      2,
      '0'
    )}.${year}`;

    // я додав
    const formattedDateForDay = formatDateForDay(formattedDay);
    console.log(formattedDay);
    console.log(formattedDateForDay);
    dispatch(setActiveDay(formattedDay));
    dispatch(fetchWaterPerDay(formattedDateForDay));
    //

    // код Андрія
    // dispatch(setActiveDay(formattedDay));
    // dispatch(fetchWaterPerDay(formattedDay));
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {daysArray.map(day => {
          const dayKey = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(
            2,
            '0'
          )}.${year}`;
          const dayData = waterPerMonth[dayKey] || [];
          const feasibility = calculateFeasibility(dayData);

          return (
            <li key={day} className={css.item}>
              <CalendarItem
                key={day}
                day={day}
                waterData={dayData}
                feasibility={feasibility}
                onClick={() => handleDayClick(day)}
                isActive={dayKey === activeDay}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Calendar;
