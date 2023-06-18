import { useContext } from "react";
import { ModalContext } from "./context";
import { Modal_Type, useModalHandler } from "./types";
import { useRegisterModal } from "./useRegisterModal";

export const useModal: useModalHandler = (Fc, props = {}, deps = []) => {
  const { init } = useContext(ModalContext);
  if (!init) {
    throw new Error(`useModal !
    please use the ModalProvider to init!
    like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>
  `);
  }

  const dispatch = useRegisterModal(Modal_Type.modal, Fc, props, deps);

  return [dispatch];
};
