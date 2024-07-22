import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import { useTranslation } from 'react-i18next'; // хук useTranslation


import css from './MonthInfo.module.css'

const MonthInfo = () => {
    const { t } = useTranslation(); //  хук для отримання функції перекладу
    return (
        <section className={css.monthSectionInfo}>
            <div className={css.monthPaginationContainer}>
                <h3 className={css.monthTitle}>{t('month')}</h3>
                <CalendarPagination />
            </div>
            
            <Calendar />
        </section>
        )
}

export default MonthInfo;