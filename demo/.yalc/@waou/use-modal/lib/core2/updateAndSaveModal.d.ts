import { MutableRefObject } from 'react';
import { StaticModalStore } from './types';
export declare const updateAndSaveModal: (modalStoreRef: MutableRefObject<StaticModalStore<any>[]>) => (instance: StaticModalStore<any>) => () => void;
