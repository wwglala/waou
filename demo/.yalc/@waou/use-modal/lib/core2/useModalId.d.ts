import { FunctionComponent } from 'react';
import { Fn } from './types';
export declare const useModalId: <T extends string | Fn>(context: T) => {
    modalId: T & string;
    component: FunctionComponent<any>;
} | {
    modalId: symbol;
    component: FunctionComponent<any>;
};
