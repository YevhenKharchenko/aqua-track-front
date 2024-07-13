import { useDispatch } from 'react-redux';
import css from './CalendarItem.module.css';
import { setActiveDay } from '../../redux/water/slice';

const CalendarItem = ({ feasibility = 0, day, isActive, onClick }) => {
    const dispatch = useDispatch();

    const containerStyle = {
        backgroundColor: isActive ? '#323f47' : (feasibility < 100 ? 'rgba(50, 63, 71, 0.2)' : '#FFFFFF'),
        color: isActive ? '#9be1a0' : '#000000'
    };

    const handleClick = () => {
        dispatch(setActiveDay(day));
        onClick();
    };

    return (
        <div className={css.container}>
            <button className={css.button} style={containerStyle} onClick={handleClick}>{day}</button>
            <p className={css.text}>{feasibility}%</p>
        </div>
    );
};

export default CalendarItem;