import { useContext } from "react";
import { ModalContext } from "./context";
import { Modal_Type, useModalHandler } from "./types";
import { useRegisterModal } from "./useRegisterModal";

export const useSideSheet: useModalHandler = (
  FunctionComponent,
  props = {},
  deps = []
) => {
  const { init } = useContext(ModalContext);
  if (!init) {
    throw new Error(`useSideSheet !
    please use the ModalProvider to init!
    like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>
  `);
  }

  const dispatch = useRegisterModal(
    Modal_Type.sideSheet,
    FunctionComponent,
    props,
    deps
  );

  return [dispatch];
};
