import { FunctionComponent, useCallback, useContext } from "react";
import { Modal_Type, Param2Props, useRegisterModalHandler } from "./types";
import { ModalContext } from "./context";

export const useDispatch = (
  modalId: symbol,
  type: Modal_Type,
  FC: FunctionComponent,
  props: Param2Props<unknown>
) => {
  const { registerModal, setVisibleIds } = useContext(ModalContext);

  const dispatch: ReturnType<useRegisterModalHandler> = useCallback(
    (visible, dispatchProps) => {
      return new Promise((resolve, reject) => {
        // exist propr and update register
        if (props) {
          registerModal({
            type,
            modalId,
            Component: FC,
            resolve,
            reject,
            props: {
              ...props,
              ...dispatchProps,
              modalProps: {
                ...(dispatchProps?.modalProps as any),
                __freeze: Boolean(dispatchProps?.modalProps), // 标示锁定 dispatch modalProps
              },
            },
          });
        }

        if (!visible) {
          setVisibleIds((beforeVids) =>
            beforeVids.filter((id) => id !== modalId)
          );
          return;
        }
        // show and update
        setVisibleIds((beforeVids) => {
          if (!beforeVids.includes(modalId)) {
            return [...beforeVids, modalId];
          }
          return [...beforeVids];
        });
      });
    },
    []
  );

  return dispatch;
};
