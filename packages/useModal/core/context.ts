import { createContext } from "react";
import {
  ModalProviderProps,
  registerModalHandler,
  registerStoreInstance,
} from "./types";

interface ModalContextProps {
  init: boolean;
  config: Omit<ModalProviderProps, "children"> | null;
  registerOrUpdateModal: registerModalHandler;
  registerStore: React.MutableRefObject<registerStoreInstance[]>;
  setVisibleIds: React.Dispatch<React.SetStateAction<Symbol[]>>;
}

const noop = () => {};

export const ModalContext = createContext<ModalContextProps>({
  init: false,
  config: null,
  registerStore: { current: [] },
  registerOrUpdateModal: noop,
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
