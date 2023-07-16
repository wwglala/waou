import { ComponentType, ReactNode, FunctionComponent } from "react";

export enum Modal_Type {
  modal = "modal",
  sideSheet = "sideSheet",
}

export interface ModalProviderProps {
  [Modal_Type.modal]: ComponentType;
  [Modal_Type.sideSheet]: ComponentType;
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
    deps?: Readonly<unknown[]>
  ): [Dispatch<T>];

  useRegister: (id: string, Fc: FunctionComponent<any>) => void;
}

export interface registerModalProps<T> {
  type: Modal_Type;
  modalId: symbol | string;
  Component: FunctionComponent<any> | string;
  props: Param2Props<T>;
  resolve?: (value: { value: unknown; onClose: () => void }) => void;
  reject?: (err: any) => void;
}

export interface registerModalHandler {
  <T>(instance: registerModalProps<T>): () => void;
}

export interface useRegisterModalHandler {
  <T>(
    type: Modal_Type,
    FunctionComponent: FunctionComponent | string,
    props: Param2Props<T>,
    deps: Readonly<unknown[]>
  ): Dispatch<T>;
}

export interface registerStoreInstance extends registerModalProps<unknown> {}
