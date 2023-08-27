/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { ModalContext } from './context';
import { InitModalType } from './types';
import { MODAL_TYPE, eo } from './constants';
import { useUpdateAndSaveModal } from './useUpdateAndSaveModal';

export const initModalType: InitModalType = (type: MODAL_TYPE) => {
  const useModal: ReturnType<InitModalType> = (
    component,
    props?,
    deps = eo,
  ) => {
    const { init } = useContext(ModalContext);

    if (!init) {
      throw new Error(`useModal !
      please use the ModalProvider to init!
      like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>
    `);
    }

    const dispatch = useUpdateAndSaveModal(type, component, props, deps);

    return [dispatch];
  };

  return useModal;
};
