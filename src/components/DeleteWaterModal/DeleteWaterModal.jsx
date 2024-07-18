import css from './DeleteWaterModal.module.css';
import { useDispatch } from 'react-redux';
import { ModalBtn } from '../ModalBtn/ModalBtn';
import { deleteWater } from '../../redux/water/operations';
import toast from 'react-hot-toast';

export const DeleteWaterModal = ({ onRequestClose, water }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    try {
      dispatch(deleteWater(water._id));
      onRequestClose();
      toast.success('The amount of water consumed has been successfully deleted.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <p className={css.text}>Are you sure you want to delete the entry?</p>
      <div className={css.box}>
        <ModalBtn text={'Delete'} onClick={onDelete}></ModalBtn>
        <ModalBtn text={'Cancel'} onClick={onRequestClose}></ModalBtn>
      </div>
    </>
  );
};
