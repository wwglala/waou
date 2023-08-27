import React, { useRef, useState, useMemo, useContext, memo } from 'react';
import { ModalProviderProps, StaticModalStore } from './types';
import { ModalContext } from './context';
import { Portal } from './Portal';
import { eo } from './constants';
import { updateAndSaveModal } from './updateAndSaveModal';

export const ModalProvider = memo((props: ModalProviderProps) => {
  const { modal, sideSheet, loadingField, interceptor = eo, children } = props;

  const [visibleIds, setVisibleIds] = useState<(symbol | string)[]>([]);

  // context link
  const { config } = useContext(ModalContext);
  const modalConfig = useMemo(() => {
    if (!modal || !sideSheet) {
      return config;
    }
    return { modal, sideSheet };
  }, [modal, sideSheet, config]);

  const modalStoreRef = useRef<StaticModalStore<any>[]>([]);

  const destroyById = (modalId: string | symbol) => {
    modalStoreRef.current = modalStoreRef.current.filter(
      mins => mins.modalId !== modalId,
    );
  };

  const contextValue = useMemo(
    () => ({
      init: true,
      config: modalConfig,
      interceptor,
      loadingField,
      modalStoreRef,
      setVisibleIds,
      destroyById,
      updateAndSaveModal: updateAndSaveModal(modalStoreRef),
    }),
    [modalConfig],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Portal visibleIds={visibleIds} />
    </ModalContext.Provider>
  );
});

ModalProvider.displayName = 'ModalProvider';
