export declare const useInjectProps: () => {
    setModalProps: <S>(setStateAction: S | ((prevState: S) => S)) => void;
    onResolve: (value?: unknown) => void;
    onReject: (err?: any) => void;
};
