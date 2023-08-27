import React, { ComponentType, ReactNode, FunctionComponent } from 'react';

declare enum MODAL_TYPE {
    MODAL = "modal",
    SIDE_SHEET = "sideSheet"
}

type Fn = (props: any) => void;
type HookParam2Props<M, C> = C extends undefined ? {
    modalProps?: M;
} : Partial<C> & {
    modalProps?: M;
};
interface UseModalProps<M> {
    <C extends Fn | string>(component: C, props?: C extends Fn ? HookParam2Props<M, Parameters<C>[0]> : HookParam2Props<M, any>, deps?: Readonly<unknown[]>): [
        <R>(visible: boolean, dispatchProps?: C extends Fn ? HookParam2Props<M, Parameters<C>[0]> : any) => Promise<R>
    ];
    useRegister: (id: string, Fc: FunctionComponent<any>) => void;
}
interface InitModalType {
    <M>(type: MODAL_TYPE): UseModalProps<M>;
}
interface ModalProviderProps {
    [MODAL_TYPE.MODAL]?: ComponentType<any>;
    [MODAL_TYPE.SIDE_SHEET]?: ComponentType<any>;
    children: ReactNode;
}

declare const ModalProvider: React.MemoExoticComponent<(props: ModalProviderProps) => React.JSX.Element>;

declare const useInjectProps: <T>() => {
    setModalProps: (setStateAction: T | ((prevState: T) => T)) => void;
    onResolve: (value?: any) => void;
    onReject: (err?: any) => void;
};

declare const createModalHook: InitModalType;

export { MODAL_TYPE, ModalProvider, createModalHook, useInjectProps };
