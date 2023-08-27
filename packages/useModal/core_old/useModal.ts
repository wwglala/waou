/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { ModalContext } from './context';
import { MODAL_TYPE, useModalHandler } from './types';
import { useRegisterModal } from './useRegisterModal';
import { useRegister } from './useRegister';
import { eo, ea } from './constants';

export const useModal: useModalHandler = (component, props = eo, deps = ea) => {
  const { init } = useContext(ModalContext);

  if (!init) {
    throw new Error(`useModal !
    please use the ModalProvider to init!
    like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>
  `);
  }

  const dispatch = useRegisterModal(MODAL_TYPE.MODAL, component, props, deps);

  return [dispatch];
};

useModal.useRegister = (id, component) => {
  useRegister(MODAL_TYPE.MODAL, id, component);
};
