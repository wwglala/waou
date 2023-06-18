import React, { useCallback, useContext, useState } from "react";
import { ModalContext, ModalInsContext } from "./context";
import { Param2Props, registerStoreInstance } from "./types";

interface PortalProps {
  visibleIds: Symbol[];
}

interface RenderProps extends registerStoreInstance, PortalProps {}
function Render(props: RenderProps) {
  const { config } = useContext(ModalContext);
  const {
    visibleIds,
    modalId,
    type,
    Component,
    props: insPropsAndModalProps,
    resolve,
    reject,
  } = props;
  const { modalProps, ...insProps } = insPropsAndModalProps;
  const ModalComponent = config![type];

  const { setVisibleIds } = useContext(ModalContext);
  const [injectProps, setInjectProps] =
    useState<Param2Props<unknown>["modalProps"]>();

  const onClose = useCallback(() => {
    setVisibleIds((beforeVids) => beforeVids.filter((id) => id !== modalId));
  }, []);

  const injectModalProps = useCallback((injectParams) => {
    setInjectProps((oldProps) => ({
      ...oldProps,
      ...injectParams,
    }));
  }, []);

  const onResolve = (value: unknown) => {
    resolve?.({ value, onClose });
  };

  const onReject = (err: any) => {
    reject?.(err);
    onClose();
  };

  return (
    <ModalInsContext.Provider
      value={{
        onClose,
        injectModalProps,
        onResolve,
        onReject,
      }}
    >
      <ModalComponent
        visible={visibleIds.includes(modalId)}
        onCancel={onClose}
        onOk={onClose}
        {...(modalProps as any)}
        {...injectProps}
      >
        <Component {...insProps} />
      </ModalComponent>
    </ModalInsContext.Provider>
  );
}

export function Portal(props: PortalProps) {
  const { visibleIds } = props;
  const { registerStore } = useContext(ModalContext);

  return (
    <>
      {registerStore.current.map((ins, idx) => (
        <Render key={idx} {...ins} visibleIds={visibleIds} />
      ))}
    </>
  );
}
