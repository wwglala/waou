import { useContext, useEffect, useMemo } from 'react';
import { ModalContext } from './context';
import { useRegisterModalHandler } from './types';
import { useDispatch } from './useDispatch';

export const useRegisterModal: useRegisterModalHandler = (
  type,
  FunctionComponent,
  props,
  deps,
) => {
  const { registerOrUpdateModal, setVisibleIds, registerStore } =
    useContext(ModalContext);

  const modalId =
    typeof FunctionComponent === 'string'
      ? FunctionComponent
      : useMemo(() => Symbol('useModal_id'), []);

  const Component = useMemo(() => {
    const Comp =
      typeof FunctionComponent === 'string'
        ? registerStore.current.find(ins => ins.modalId === FunctionComponent)
            ?.Component
        : FunctionComponent;

    return Comp;
  }, []);

  if (!Component || typeof Component === 'string') {
    throw new Error('please check you register Name');
  }

  // sync register
  const destroy = useMemo(
    () =>
      registerOrUpdateModal({
        type,
        modalId,
        Component,
        props,
      }),
    [deps],
  );

  // unregister
  useEffect(() => destroy, []);

  // update
  useEffect(() => {
    setVisibleIds(beforeVids => [...beforeVids]);
  }, deps);

  const dispatch = useDispatch(modalId, type, Component, props);

  return dispatch;
};
