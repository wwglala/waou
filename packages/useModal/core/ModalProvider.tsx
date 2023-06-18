import React, { useRef, useState, useMemo, useContext } from "react";
import { ModalProviderProps, registerStoreInstance } from "./types";
import { useRootRegisterModal } from "./useRootRegisterModal";
import { ModalContext } from "./context";
import { Portal } from "./Portal";

export function ModalProvider(props: ModalProviderProps) {
  const { modal, sideSheet, children } = props;
  const { config } = useContext(ModalContext);

  const [visibleIds, setVisibleIds] = useState<Symbol[]>([]);
  const registerStore = useRef<registerStoreInstance[]>([]);
  const registerModal = useRootRegisterModal(registerStore);

  // context link
  const modalConfig = useMemo(() => {
    if (!modal || !sideSheet) {
      return config;
    }
    return { modal, sideSheet };
  }, [modal, sideSheet, config]);

  const contextValue = useMemo(() => {
    return {
      init: true,
      config: modalConfig,
      registerModal,
      registerStore,
      setVisibleIds,
    };
  }, [modalConfig]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Portal visibleIds={visibleIds}></Portal>
    </ModalContext.Provider>
  );
}
