import { FunctionComponent, useContext } from 'react';
import { MODAL_TYPE, useRegisterModalHandler } from './types';
import { ModalContext } from './context';
import { eo } from './constants';

export const useDispatch = (
  modalId: symbol | string,
  type: MODAL_TYPE,
  FC: FunctionComponent,
) => {
  const { registerModalInstance, setVisibleIds } = useContext(ModalContext);

  const dispatch: ReturnType<useRegisterModalHandler> = (
    visible,
    dispatchProps = eo,
  ) =>
    new Promise((resolve, reject) => {
      registerModalInstance({
        type,
        modalId,
        Component: FC,
        resolve,
        reject,
        props: {
          ...dispatchProps,
          ...dispatchProps?.modalProps,
          __freeze: Boolean(dispatchProps?.modalProps),
        },
      });

      // hide
      if (!visible) {
        setVisibleIds(beforeVids => beforeVids.filter(id => id !== modalId));
        return;
      }
      // show and update
      setVisibleIds(beforeVids =>
        beforeVids.includes(modalId)
          ? [...beforeVids]
          : [...beforeVids, modalId],
      );
    });

  return dispatch;
};
