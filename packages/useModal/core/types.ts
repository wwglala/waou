import { ComponentType, ReactNode, FunctionComponent } from 'react';

export enum MODAL_TYPE {
  MODAL = 'modal',
  SIDE_SHEET = 'sideSheet',
}

export interface ModalProviderProps {
  [MODAL_TYPE.MODAL]?: ComponentType;
  [MODAL_TYPE.SIDE_SHEET]?: ComponentType;
  children: ReactNode;
}

export interface Param2Props<T> {
  modalProps?: T & { __freeze?: boolean };
  [x: string]: unknown;
}

export interface Dispatch<T> {
  (visible: boolean, props?: Param2Props<T>): Promise<{
    value: any;
    onClose: () => void;
  }>;
}

export interface useModalHandler {
  <T>(
    FunctionComponent: FunctionComponent<any> | string,
    props?: Param2Props<T>,
    deps?: Readonly<unknown[]>,
  ): [Dispatch<T>];

  useRegister: (id: string, Fc: FunctionComponent<any>) => void;
}

export interface registerModalProps<T> {
  type: MODAL_TYPE;
  modalId: symbol | string;
  Component: FunctionComponent<any>;
  props: Param2Props<T>;
  resolve?: (value: unknown) => void;
  reject?: (err: any) => void;
}

export interface registerModalHandler {
  <T>(instance: registerModalProps<T>): () => void;
}

export interface useRegisterModalHandler {
  <T>(
    type: MODAL_TYPE,
    FunctionComponent: FunctionComponent | string,
    props: Param2Props<T>,
    deps: Readonly<unknown[]>,
  ): Dispatch<T>;
}

export interface registerStoreInstance extends registerModalProps<unknown> {}
