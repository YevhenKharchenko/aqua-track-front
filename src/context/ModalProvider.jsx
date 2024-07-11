import { createContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalBackdrop from '../shared/components/ModalBackdrop/ModalBackdrop.jsx';

export const ModalContext = createContext();
const modalRoot = document.querySelector('#modal-root');

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const handleSetModal = useCallback(modal => {
    setModal(modal);
  }, []);

  return (
    <ModalContext.Provider value={handleSetModal}>
      {children}
      {modal &&
        createPortal(<ModalBackdrop onClose={handleSetModal}>{modal}</ModalBackdrop>, modalRoot)}
    </ModalContext.Provider>
  );
};
