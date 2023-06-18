import { ComponentType, ReactNode, FunctionComponent } from 'react';

declare enum Modal_Type {
    modal = "modal",
    sideSheet = "sideSheet"
}
interface ModalProviderProps {
    [Modal_Type.modal]: ComponentType;
    [Modal_Type.sideSheet]: ComponentType;
    children: ReactNode;
}
interface Param2Props<T> {
    modalProps: T;
    [x: string]: unknown;
}
interface Dispatch<T> {
    (visible: boolean, props: Param2Props<T>): void;
}
interface useModalHandler {
    <T>(FunctionComponent: FunctionComponent, props: Param2Props<T>, deps: Readonly<unknown[]>): [Dispatch<T>];
}

declare function ModalProvider(props: ModalProviderProps): JSX.Element;

declare const useModal: useModalHandler;

export { ModalProvider, useModal };
