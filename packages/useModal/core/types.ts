import { ComponentType, FunctionComponent, ReactNode, MutableRefObject, Dispatch, SetStateAction } from 'react';
import { MODAL_TYPE } from './constants';

export type Fn = (props: any) => void;

export type HookParam2Props<M, C> = C extends undefined
  ? {
    modalProps?: M;
  }
  : Partial<C> & {
    modalProps?: M;
  };

export interface UseModalProps<M> {
  <C extends Fn | string>(
    component: C,
    props?: C extends Fn ? HookParam2Props<M, Parameters<C>[0]> : HookParam2Props<M, any>,
    deps?: Readonly<unknown[]>
  ): [
    <R>(
      visible: boolean,
      dispatchProps?: C extends Fn ? HookParam2Props<M, Parameters<C>[0]> : HookParam2Props<M, any>
    ) => Promise<R>
  ];

  useRegister: (id: string, Fc: FunctionComponent<any>) => void;
}

export interface InitModalType {
  <M>(type: MODAL_TYPE): UseModalProps<M>;
}

export interface ModalProviderProps {
  [MODAL_TYPE.MODAL]?: ComponentType<any>;
  [MODAL_TYPE.SIDE_SHEET]?: ComponentType<any>;
  interceptor?: {
    modalProps?: <T>(props: T) => T;
  };
  loadingField?: string;
  children: ReactNode;
}

export interface StaticModalStore<M> {
  type: MODAL_TYPE;
  modalId: symbol | string;
  Component: FunctionComponent<any>;
  props?: HookParam2Props<M, any>;
  resolve: (value?: any) => void;
  reject: (err?: any) => void;
}

export interface ModalContextProps {
  init: boolean;
  config: Omit<ModalProviderProps, 'children'> | null;
  modalStoreRef: MutableRefObject<StaticModalStore<any>[]>;
  setVisibleIds: Dispatch<SetStateAction<(symbol | string)[]>>;
  updateAndSaveModal: (modalInstance: StaticModalStore<any>) => void;
  destroyById: (modalId: string | symbol) => void;
  interceptor: ModalProviderProps['interceptor'];
  loadingField?: string;
}
