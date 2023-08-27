import React from 'react';
import { ModalProviderProps, StaticModalStore } from './types';
interface ModalContextProps {
    init: boolean;
    config: Omit<ModalProviderProps, 'children'> | null;
    modalStoreRef: React.MutableRefObject<StaticModalStore<any>[]>;
    setVisibleIds: React.Dispatch<React.SetStateAction<(symbol | string)[]>>;
    updateAndSaveModal: (modalInstance: StaticModalStore<any>) => void;
    destroyById: (modalId: string | symbol) => void;
}
type SetStateAction<S> = S | ((prevState: S) => S);
export declare const ModalContext: React.Context<ModalContextProps>;
export declare const ModalInsContext: React.Context<{
    setModalProps: <S>(setStateAction: SetStateAction<S>) => void;
    onResolve: (value?: any) => void;
    onReject: (err?: any) => void;
}>;
export {};
