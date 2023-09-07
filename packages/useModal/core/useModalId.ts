/* eslint-disable react-hooks/rules-of-hooks */
import { FunctionComponent, useContext, useMemo } from 'react';
import { ModalContext } from './context';
import { Fn } from './types';

export const useModalId = <T extends string | Fn>(context: T) => {
  const { modalStoreRef } = useContext(ModalContext);

  if (typeof context === 'string') {
    const component = modalStoreRef.current.find(ins => ins.modalId === context)?.Component;

    if (!component) {
      throw new Error(`useModal: Please check this name [${context}], Are you registered?`);
    }

    return {
      modalId: context,
      component,
    };
  } else {
    return {
      modalId: useMemo(() => Symbol('useModal_id'), []),
      component: context as FunctionComponent,
    };
  }
};
