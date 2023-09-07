/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, useMemo } from 'react';
import { ModalContext } from './context';
import { InitModalType } from './types';
import { MODAL_TYPE, ea, eo, noop } from './constants';
import { useUpdateAndSaveModal } from './useUpdateAndSaveModal';

export const createModalHook: InitModalType = (type: MODAL_TYPE) => {
  const useModal: ReturnType<InitModalType> = (component, props?, deps = ea) => {
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

  useModal.useRegister = (modalId, Component) => {
    const { init, updateAndSaveModal, destroyById } = useContext(ModalContext);
    if (!init) {
      throw new Error(`useModal !
    please use the ModalProvider to init!
    like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>
  `);
    }

    useMemo(() => {
      updateAndSaveModal({
        type,
        modalId,
        Component,
        props: eo,
        reject: noop,
        resolve: noop,
      });
    }, []);

    useEffect(
      () => () => {
        destroyById(modalId);
      },
      []
    );
  };

  return useModal;
};
