import css from './DeleteWaterModal.module.css';
import { useDispatch } from 'react-redux';
import { ModalBtn } from '../ModalBtn/ModalBtn';
import { deleteWater } from '../../redux/water/operations';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next'; // хук useTranslation

export const DeleteWaterModal = ({ onRequestClose, water }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(); //  хук для отримання функції перекладу

  const onDelete = () => {
    try {
      dispatch(deleteWater(water._id));
      onRequestClose();
      toast.success(t('water deleted successfully')); 
    } catch (error) {
      toast.error(t('something went wrong')); 
    }
  };

  return (
    <>
      <p className={css.text}>{t('confirm delete entry')}</p> 
      <div className={css.box}>
        <ModalBtn text={t('delete')} onClick={onDelete} /> 
        <ModalBtn text={t('cancel')} onClick={onRequestClose} /> 
      </div>
    </>
  );
};
