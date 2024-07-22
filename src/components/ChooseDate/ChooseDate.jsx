import { useSelector } from "react-redux";
import css from "./ChooseDate.module.css";
import { selectActiveDay } from "../../redux/selectors";
import { useTranslation } from 'react-i18next'; // Імпортуйте хук useTranslation для перекладу

export function ChooseDate() {
  const { t } = useTranslation(); // Використовуйте хук useTranslation для отримання функції перекладу
  const currentDate = useSelector(selectActiveDay);

  const localDate = () => {
    const milliseconds = Date.now();
    const date = new Date(milliseconds);

    return date.toLocaleDateString().replace(/\//g, ".");
  };

  let day = currentDate.replace(/\//g, ".").split(".")[0];

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

  // Отримання назви місяця за допомогою перекладу
  const monthIndex = +currentDate.split("/")[1] - 1;
  const monthDotIndex = +currentDate.split(".")[1] - 1;

  const month = months[monthIndex];
  const monthDot = months[monthDotIndex];

  return (
    <>
      <h2 className={css.date}>
        {currentDate.replace(/\//g, ".") === localDate()
          ? t('today') // Текст "Today"
          : `${day}, ${month || monthDot}`}
      </h2>
    </>
  );
}
