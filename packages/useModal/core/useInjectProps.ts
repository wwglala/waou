import { useContext } from 'react';
import { ModalInsContext } from './context';

export const useInjectProps = <T>() => {
  const { setModalProps, ...otherProps } = useContext(ModalInsContext);

  return {
    ...otherProps,
    setModalProps: setModalProps<T>
  };
};
