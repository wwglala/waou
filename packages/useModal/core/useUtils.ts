/* eslint-disable react-hooks/rules-of-hooks */
import { FunctionComponent, useContext, useMemo } from 'react';
import { ModalContext } from './context';

export enum UTILS_TYPE {
  GEN_MODAL_ID,
  GET_STORE_INSTANCE,
}

export const useUtils = <T>(context: T) => {
  const { registerStore } = useContext(ModalContext);
  const modalId =
    typeof context === 'string'
      ? (context as unknown as string)
      : useMemo(() => Symbol('useModal_id'), []);

  const functionComponent =
    typeof context === 'function'
      ? (context as unknown as FunctionComponent<any>)
      : registerStore.current.find(ins => ins.modalId === modalId)?.Component;

  return {
    modalId,
    functionComponent,
  };
};
