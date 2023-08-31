import { useContext, useEffect, useMemo } from 'react';
import { MODAL_TYPE, ea, noop } from './constants';
import { InitModalType } from './types';
import { ModalContext } from './context';
import { useModalId } from './useModalId';

export const useUpdateAndSaveModal = (
  type: MODAL_TYPE,
  component: Parameters<ReturnType<InitModalType>>[0],
  props?: Parameters<ReturnType<InitModalType>>[1],
  deps: Parameters<ReturnType<InitModalType>>[2] = ea
) => {
  const { setVisibleIds, updateAndSaveModal, destroyById } = useContext(ModalContext);

  const { modalId, component: functionComponent } = useModalId(component);

  const currentModalProps = {
    type,
    modalId,
    Component: functionComponent,
    props,
  };

  // update
  useMemo(
    () =>
      updateAndSaveModal({
        ...currentModalProps,
        resolve: noop,
        reject: noop,
        props,
      }),
    deps
  );

  // update
  useEffect(() => {
    setVisibleIds(beforeVids => (beforeVids.includes(modalId) ? [...beforeVids] : beforeVids));
  }, deps);

  // destroy
  useEffect(
    () => () => {
      if (typeof modalId !== 'string') {
        destroyById(modalId);
      }
    },
    [modalId]
  );

  const dispatch: ReturnType<ReturnType<InitModalType>>[0] = (visible, dispatchProps) =>
    new Promise((resolve, reject) => {
      updateAndSaveModal({
        ...currentModalProps,
        resolve,
        reject,
        props: {
          ...currentModalProps.props,
          ...dispatchProps,
          modalProps: {
            ...(currentModalProps.props?.modalProps as any),
            ...(dispatchProps?.modalProps as any),
          },
        },
      });

      // hide
      if (!visible) {
        setVisibleIds(beforeVids => beforeVids.filter(id => id !== modalId));
        return;
      }
      // show and update
      setVisibleIds(beforeVids => (beforeVids.includes(modalId) ? [...beforeVids] : [...beforeVids, modalId]));
    });

  return dispatch;
};
