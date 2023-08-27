import { FunctionComponent, useContext, useMemo } from 'react';
import { ModalContext } from './context';
import { MODAL_TYPE } from './types';
import { eo } from './constants';

export const useRegister = (
  type: MODAL_TYPE,
  id: string,
  Fc: FunctionComponent<any>,
) => {
  const { init, registerModalInstance } = useContext(ModalContext);
  if (!init) {
    throw new Error(`useModal !
    please use the ModalProvider to init!
    like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>
  `);
  }

  useMemo(() => {
    registerModalInstance({
      type,
      Component: Fc,
      modalId: id,
      props: eo,
    });
  }, []);
};
