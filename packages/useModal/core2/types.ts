import { ComponentType, FunctionComponent, ReactNode } from 'react';
import { MODAL_TYPE } from './constants';

export type Fn = (props: any) => void;

export type HookParam2Props<M, C> = C extends undefined
  ? {
      modalProps?: M;
    }
  : Partial<C> & {
      modalProps?: M;
    };

export interface InitModalType {
  <M>(type: MODAL_TYPE): <C extends Fn | string>(
    component: C,
    props?: C extends Fn
      ? HookParam2Props<M, Parameters<C>[0]>
      : HookParam2Props<M, any>,
    deps?: Readonly<unknown[]>,
  ) => [
    <R>(
      visible: boolean,
      dispatchProps?: C extends Fn ? HookParam2Props<M, Parameters<C>[0]> : any,
    ) => Promise<R>,
  ];
}

export interface ModalProviderProps {
  [MODAL_TYPE.MODAL]?: ComponentType<any>;
  [MODAL_TYPE.SIDE_SHEET]?: ComponentType<any>;
  children: ReactNode;
}

export interface StaticModalStore<M> {
  type: MODAL_TYPE;
  modalId: symbol | string;
  Component: FunctionComponent<any>;
  props?: HookParam2Props<any, M>;
  resolve: (value: any) => void;
  reject: (err: any) => void;
}
