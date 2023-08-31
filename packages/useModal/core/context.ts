import { createContext } from 'react';
import { ModalContextProps } from './types';
import { eo, noop } from './constants';

type SetStateAction<S> = S | ((prevState: S) => S);

export const ModalContext = createContext<ModalContextProps>({
  init: false,
  config: null,
  modalStoreRef: { current: [] },
  setVisibleIds: noop,
  updateAndSaveModal: noop,
  destroyById: noop,
  interceptor: eo,
  loadingField: undefined,
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
