import React, { createContext } from 'react';
import {
  ModalProviderProps,
  registerModalHandler,
  registerStoreInstance,
} from './types';

interface ModalContextProps {
  init: boolean;
  config: Omit<ModalProviderProps, 'children'> | null;
  registerModalInstance: registerModalHandler;
  registerStore: React.MutableRefObject<registerStoreInstance[]>;
  setVisibleIds: React.Dispatch<React.SetStateAction<(symbol | string)[]>>;
}

const noop = () => {};

export const ModalContext = createContext<ModalContextProps>({
  init: false,
  config: null,
  registerStore: { current: [] },
  registerModalInstance: () => noop,
  setVisibleIds: noop,
});

export const ModalInsContext = createContext<{
  onClose: () => void;
  injectModalProps: <T>(props: T) => void;
  onResolve: (value: unknown) => void;
  onReject: (err: any) => void;
}>({
  onClose: noop,
  injectModalProps: noop,
  onResolve: noop,
  onReject: noop,
});

// @todo plugin context
