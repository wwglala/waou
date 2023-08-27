import React, { createContext } from 'react';
import { ModalProviderProps, StaticModalStore } from './types';
import { noop } from './constants';

interface ModalContextProps {
  init: boolean;
  config: Omit<ModalProviderProps, 'children'> | null;
  modalStoreRef: React.MutableRefObject<StaticModalStore<any>[]>;
  setVisibleIds: React.Dispatch<React.SetStateAction<(symbol | string)[]>>;
  updateAndSaveModal: (modalInstance: StaticModalStore<any>) => void;
  destroyById: (modalId: string | symbol) => void;
}

type SetStateAction<S> = S | ((prevState: S) => S);

export const ModalContext = createContext<ModalContextProps>({
  init: false,
  config: null,
  modalStoreRef: { current: [] },
  setVisibleIds: noop,
  updateAndSaveModal: noop,
  destroyById: noop,
});

export const ModalInsContext = createContext<{
  setModalProps: <S>(setStateAction: SetStateAction<S>) => void;
  onResolve: (value?: any) => void;
  onReject: (err?: any) => void;
}>({
  setModalProps: noop,
  onResolve: noop,
  onReject: noop,
});
