import { useContext, useEffect, useMemo } from "react";
import { ModalContext } from "./context";
import { useRegisterModalHandler } from "./types";
import { useDispatch } from "./useDispatch";
import { useUtils } from "./useUtils";

export const useRegisterModal: useRegisterModalHandler = (
  type,
  component,
  props,
  deps
) => {
  const { registerModalInstance, setVisibleIds } = useContext(ModalContext);

  const { modalId, functionComponent } = useUtils(component);

  if (!functionComponent) {
    throw new Error("Please check your register Name");
  }

  // sync register
  const destroy = useMemo(
    () =>
      registerModalInstance({
        type,
        modalId,
        Component: functionComponent,
        props,
      }),
    [deps]
  );

  // unregister
  useEffect(() => destroy, []);

  // update
  useEffect(() => {
    setVisibleIds((beforeVids) =>
      beforeVids.includes(modalId) ? [...beforeVids] : beforeVids
    );
  }, deps);

  return useDispatch(modalId, type, functionComponent);
};
