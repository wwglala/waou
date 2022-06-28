import React, { ReactElement, FunctionComponent, MutableRefObject } from 'react';

interface ModalConfig<T = any, V = any> {
    Dialog: T;
    Drawer: V;
}
interface OutPropsType<T> {
    modalProps?: T;
    props?: any;
    [x: string]: any;
}
declare type Dispatch<T> = (visible: boolean, outProps?: OutPropsType<T>) => void;
declare type FirstParamType = ComponentType | ReactElement | FunctionComponent<any>;
interface ModalStore<T> {
    id: Symbol;
    visible: boolean;
    Component: FirstParamType;
    dispatch: (visible: boolean, props?: OutPropsType<T>) => void;
    modalProps?: T;
    props?: any;
}
interface ComponentType {
    type: "Dialog" | "Drawer";
    Component: ReactElement | FunctionComponent<any>;
}
declare function useModal<T>(Component: FirstParamType, modalProps?: T, deps?: Readonly<any[]>): [Dispatch<T>];
interface ModalProviderProps {
    config: ModalConfig;
    children?: any;
}
declare type Fn = (store: Array<ModalStore<any>>) => Array<ModalStore<any>>;
interface ContextType {
    modalContainer: MutableRefObject<Array<ModalStore<any>>>;
    registerModal: (f: Fn) => void;
    updateModal: (f: Fn) => void;
}
interface ModalProvider {
    (props: ModalProviderProps): JSX.Element;
    context?: ContextType;
}
declare const ModalProvider: ModalProvider;
declare const MemoModalProvider: React.MemoExoticComponent<ModalProvider>;

export { MemoModalProvider, ModalProvider, ModalStore, useModal };
