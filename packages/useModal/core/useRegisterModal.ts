import { useContext, useEffect, useMemo } from "react";
import { ModalContext } from "./context";
import { useRegisterModalHandler } from "./types";
import { useDispatch } from "./useDispatch";

export const useRegisterModal: useRegisterModalHandler = (
  type,
  FunctionComponent,
  props,
  deps
) => {
  const { registerModal, setVisibleIds } = useContext(ModalContext);

  const modalId = useMemo(() => Symbol("useModal_id"), []);

  // sync register/unregister
  useMemo(
    () =>
      registerModal({
        type,
        modalId,
        Component: FunctionComponent,
        props,
      }),
    [deps]
  );

  // update
  useEffect(() => {
    setVisibleIds((beforeVids) => [...beforeVids]);
  }, deps);

  const dispatch = useDispatch(modalId, type, FunctionComponent, props);

  return dispatch;
};
