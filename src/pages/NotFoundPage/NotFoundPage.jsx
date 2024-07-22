import { useTranslation } from 'react-i18next'; // хук useTranslation


const NotFoundPage = () => {
      const { t } = useTranslation(); //  хук для отримання функції перекладу

  return <div>{t('notFoundPage')}</div>;
};

export default NotFoundPage;
