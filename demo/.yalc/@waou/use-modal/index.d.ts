import React, { ComponentType, ReactNode } from 'react';

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
interface InitModalType {
    <M>(type: MODAL_TYPE): <C extends Fn | string>(component: C, props?: C extends Fn ? HookParam2Props<M, Parameters<C>[0]> : HookParam2Props<M, any>, deps?: Readonly<unknown[]>) => [
        <R>(visible: boolean, dispatchProps?: C extends Fn ? HookParam2Props<M, Parameters<C>[0]> : any) => Promise<R>
    ];
}
interface ModalProviderProps {
    [MODAL_TYPE.MODAL]?: ComponentType<any>;
    [MODAL_TYPE.SIDE_SHEET]?: ComponentType<any>;
    children: ReactNode;
}

declare const ModalProvider: React.MemoExoticComponent<(props: ModalProviderProps) => React.JSX.Element>;

declare const useInjectProps: () => {
    setModalProps: <S>(setStateAction: S | ((prevState: S) => S)) => void;
    onResolve: (value?: unknown) => void;
    onReject: (err?: any) => void;
};

declare const initModalType: InitModalType;

export { ModalProvider, initModalType, useInjectProps };
