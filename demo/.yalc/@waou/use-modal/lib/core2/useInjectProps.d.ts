export declare const useInjectProps: <T>() => {
    setModalProps: (setStateAction: T | ((prevState: T) => T)) => void;
    onResolve: (value?: any) => void;
    onReject: (err?: any) => void;
};
