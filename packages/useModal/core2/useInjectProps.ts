import { useContext } from 'react';
import { ModalInsContext } from './context';

export const useInjectProps = () => {
  return useContext(ModalInsContext);
};
