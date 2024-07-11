import { useContext } from 'react';
import { ModalContext } from '../context/ModalProvider.jsx';

export const useModal = () => useContext(ModalContext);
