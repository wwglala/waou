import React, { ComponentType, ReactNode, FunctionComponent } from 'react';

declare enum MODAL_TYPE {
    MODAL = "modal",
    SIDE_SHEET = "sideSheet"
}
interface ModalProviderProps {
    [MODAL_TYPE.MODAL]?: ComponentType;
    [MODAL_TYPE.SIDE_SHEET]?: ComponentType;
    children: ReactNode;
}
interface Param2Props<T> {
    modalProps?: T & {
        __freeze?: boolean;
    };
    [x: string]: unknown;
}
interface Dispatch<T> {
    (visible: boolean, props?: Param2Props<T>): Promise<{
        value: any;
        onClose: () => void;
    }>;
}
interface useModalHandler {
    <T>(FunctionComponent: FunctionComponent<any> | string, props?: Param2Props<T>, deps?: Readonly<unknown[]>): [Dispatch<T>];
    useRegister: (id: string, Fc: FunctionComponent<any>) => void;
}

declare const ModalProvider: React.MemoExoticComponent<(props: ModalProviderProps) => JSX.Element>;

declare const useModal: useModalHandler;

declare const useInjectProps: <M>() => {
    useInjectModalProps: (props: M, deps?: any[]) => void;
    onClose: () => void;
    injectModalProps: <T>(props: T) => void;
    onResolve: (value: unknown) => void;
    onReject: (err: any) => void;
};

export { ModalProvider, useInjectProps, useModal };
