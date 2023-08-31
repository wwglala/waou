import React, { ReactNode, memo, useContext, useMemo, useState } from 'react';
import { ModalContext, ModalInsContext } from './context';
import { StaticModalStore } from './types';
import { useNotUnmount } from './useUnmount';

interface PortalProps {
  visibleIds: (symbol | string)[];
}

interface RenderProps extends StaticModalStore<any>, PortalProps {}

const RenderModal = (props: RenderProps & { children: ReactNode; modalProps: any }) => {
  const { modalId, type, resolve, reject, visibleIds, modalProps, children } = props;

  const { config } = useContext(ModalContext);

  const { setVisibleIds, loadingField } = useContext(ModalContext);
  const [injectModalProps, setModalProps] = useState(modalProps);

  // 没有卸载，重置 modal props
  useNotUnmount(() => {
    if (!visibleIds.includes(modalId)) {
      setModalProps(modalProps);
    }
  }, [visibleIds]);

  const ModalComponent = config![type]!;

  const onClose = () => {
    setVisibleIds(beforeVids => beforeVids.filter(id => id !== modalId));
  };

  const onResolve = (value?: any) => {
    resolve(value);
    onClose();
  };

  const onReject = (e?: any) => {
    reject(e);
    onClose();
  };

  const ModalInsContextValue = useMemo(
    () => ({
      setModalProps,
      onResolve,
      onReject,
    }),
    []
  );

  const onOk = async () => {
    if (loadingField) {
      setModalProps((state: any) => ({ ...state, [loadingField]: true }));
    }
    const handler = injectModalProps?.onOk || onResolve;
    try {
      await handler();
    } finally {
      if (loadingField) {
        setModalProps((state: any) => ({ ...state, [loadingField]: false }));
      }
    }
  };

  return (
    <ModalComponent visible={visibleIds.includes(modalId)} onCancel={onReject} {...injectModalProps} onOk={onOk}>
      <ModalInsContext.Provider value={ModalInsContextValue}>{children}</ModalInsContext.Provider>
    </ModalComponent>
  );
};

export const Portal = memo((props: PortalProps) => {
  const { visibleIds } = props;
  const { modalStoreRef } = useContext(ModalContext);

  return (
    <>
      {modalStoreRef.current.map((modalInstance, idx) => {
        const { Component, props: componentProps } = modalInstance;

        const { modalProps, ...insProps } = componentProps || {};

        return (
          <RenderModal key={idx} {...modalInstance} visibleIds={visibleIds} modalProps={modalProps}>
            <Component {...insProps} />
          </RenderModal>
        );
      })}
    </>
  );
});
