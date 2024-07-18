import { useState } from 'react';
import css from './WaterItem.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { BaseModal } from '../BaseModal/BaseModal';
import WaterModal from '../WaterModal/WaterModal';
import { DeleteWaterModal } from '../DeleteWaterModal/DeleteWaterModal';
import { GlobalModal } from '../GlobalModal/GlobalModal.jsx';
//назви функцій з модалок треба змінити під назви що наші зроблять

export function WaterItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const openModalDelete = () => {
    setIsOpenDelete(true);
  };
  const closeModalDelete = () => {
    setIsOpenDelete(false);
  };
  // console.log('waterItem:', item);
  const water =
    item.amount >= 999 ? Math.round((item.amount / 1000) * 100) / 100 + ' L' : item.amount + ' ml';

  return (
    <div className={css.card}>
      <svg className={css.bottleIcon}>
        <use href={sprite + '#icon-glass-38x38'}></use>
      </svg>
      <div className={css.textBox}>
        <p className={css.ml}>{water}</p>
        <p className={css.time}>{item.time}</p>
      </div>
      <div className={css.btnBox}>
        <button className={css.button} type="button" onClick={openModal}>
          <svg className={css.btnIcon}>
            <use href={sprite + '#icon-edit-16x16'}></use>
          </svg>
        </button>
        <button className={css.button} type="button" onClick={openModalDelete}>
          <svg className={css.btnIcon}>
            <use href={sprite + '#icon-trash-16x16'}></use>
          </svg>
        </button>
      </div>

      <div>
        <BaseModal isOpen={isOpen} onClose={closeModal}>
          <WaterModal mode={'edit'} onClose={closeModal} water={item} />
        </BaseModal>
      </div>

      <GlobalModal isOpen={isOpenDelete} title={'Delete'} onRequestClose={closeModalDelete}>
        <DeleteWaterModal onRequestClose={closeModalDelete} water={item} />
      </GlobalModal>
    </div>
  );
}
