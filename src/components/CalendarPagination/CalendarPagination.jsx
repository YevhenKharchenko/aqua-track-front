import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDate } from '../../redux/water/slice';
import { fetchWaterPerMonth } from '../../redux/water/operations';
import { isMonthNameCurrent } from '../../helpers/isMonthNameCurrent.js';
import css from './CalendarPagination.module.css';
import { icons as sprite } from '../../assets/icons/index.js';
import { formatDateToDayMonthYear } from '../../helpers/formatDateToDayMonthYear.js';
import { useTranslation } from 'react-i18next'; // Імпортуйте хук useTranslation для перекладу

// Перекладені назви місяців
  const months = [
    t('January'),
    t('February'),
    t('March'),
    t('April'),
    t('May'),
    t('June'),
    t('July'),
    t('August'),
    t('September'),
    t('October'),
    t('November'),
    t('December'),
  ];

const CalendarPagination = () => {
  const { t } = useTranslation(); // Використовуйте хук useTranslation для отримання функції перекладу
  const dispatch = useDispatch();
  const currentDate = useSelector(state => state.water.currentDate);

  const fetchAndSetDate = newDate => {
    const localDate = newDate.toLocaleDateString();
    // я додав
    const formattedDateForMonth = formatDateToDayMonthYear(localDate);

    dispatch(setCurrentDate(newDate.getTime()));
    dispatch(fetchWaterPerMonth(formattedDateForMonth));
    //

    // dispatch(fetchWaterPerMonth(localDate));
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    fetchAndSetDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    fetchAndSetDate(newDate);
  };
  const isDisabled = isMonthNameCurrent(months[new Date(currentDate).getMonth()]);

  return (
    <div className={css.container}>
      <button className={css.button} type="button" onClick={goToPreviousMonth}>
        <svg className={css.icon}>
          <use xlinkHref={`${sprite}#icon-chevron-left`}></use>
        </svg>
      </button>
      <p>
        {months[new Date(currentDate).getMonth()]}, {new Date(currentDate).getFullYear()}
      </p>
      <button className={css.button} type="button" onClick={goToNextMonth} disabled={isDisabled}>
        <svg className={css.icon}>
          <use xlinkHref={`${sprite}#icon-arrow-right-18x18`}></use>
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;
