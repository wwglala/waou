import React, { useRef, useState, useMemo, useContext, memo } from 'react';
import { ModalProviderProps, registerStoreInstance } from './types';
import { useRootRegisterModal } from './useRootRegisterModal';
import { ModalContext } from './context';
import { Portal } from './Portal';

export const ModalProvider = memo((props: ModalProviderProps) => {
  const { modal, sideSheet, children } = props;

  const [visibleIds, setVisibleIds] = useState<(symbol | string)[]>([]);
  const registerStore = useRef<registerStoreInstance[]>([]);

  // context link
  const { config } = useContext(ModalContext);
  const modalConfig = useMemo(() => {
    if (!modal || !sideSheet) {
      return config;
    }
    return { modal, sideSheet };
  }, [modal, sideSheet, config]);

  const registerModalInstance = useRootRegisterModal(registerStore);

  const contextValue = useMemo(
    () => ({
      init: true,
      config: modalConfig,
      registerModalInstance,
      registerStore,
      setVisibleIds,
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
