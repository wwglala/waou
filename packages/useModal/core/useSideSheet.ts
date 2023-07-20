/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { ModalContext } from './context';
import { MODAL_TYPE, useModalHandler } from './types';
import { useRegisterModal } from './useRegisterModal';
import { useRegister } from './useRegister';
import { ea, eo } from './constants';

export const useSideSheet: useModalHandler = (
  FunctionComponent,
  props = eo,
  deps = ea,
) => {
  const { init } = useContext(ModalContext);
  if (!init) {
    throw new Error(`useSideSheet !
    please use the ModalProvider to init!
    like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>
  `);
  }

  const dispatch = useRegisterModal(
    MODAL_TYPE.SIDE_SHEET,
    FunctionComponent,
    props,
    deps,
  );

  return [dispatch];
};

useSideSheet.useRegister = (id, Fc) => {
  useRegister(MODAL_TYPE.SIDE_SHEET, id, Fc);
};
