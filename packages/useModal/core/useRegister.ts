import { FunctionComponent, useContext, useMemo } from "react";
import { ModalContext } from "./context";
import { Modal_Type } from "./types";

export const useRegister = (
  type: Modal_Type,
  id: string,
  Fc: FunctionComponent<any>
) => {
  const { init, registerOrUpdateModal } = useContext(ModalContext);
  if (!init) {
    throw new Error(`useModal !
    please use the ModalProvider to init!
    like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>
  `);
  }

  useMemo(() => {
    registerOrUpdateModal({
      type,
      Component: Fc,
      modalId: id,
      props: {},
    });
  }, []);
};
