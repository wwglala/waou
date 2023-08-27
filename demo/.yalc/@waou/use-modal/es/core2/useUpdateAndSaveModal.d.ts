import { MODAL_TYPE } from './constants';
import { InitModalType } from './types';
export declare const useUpdateAndSaveModal: (type: MODAL_TYPE, component: Parameters<ReturnType<InitModalType>>[0], props: Parameters<ReturnType<InitModalType>>[1], deps: Parameters<ReturnType<InitModalType>>[2]) => <R>(visible: boolean, dispatchProps?: any) => Promise<R>;
