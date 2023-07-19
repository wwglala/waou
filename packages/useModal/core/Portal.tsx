import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { ModalContext, ModalInsContext } from "./context";
import { Param2Props, registerStoreInstance } from "./types";

interface PortalProps {
  visibleIds: (symbol | string)[];
}

interface RenderProps extends registerStoreInstance, PortalProps {}
const Render = memo((props: RenderProps) => {
  const {
    visibleIds,
    modalId,
    type,
    Component,
    props: insPropsAndModalProps,
    resolve,
    reject,
  } = props;

  const { config } = useContext(ModalContext);
  const { modalProps, ...insProps } = insPropsAndModalProps;
  const ModalComponent = config![type];

  const { setVisibleIds } = useContext(ModalContext);

  const [injectModalProps, setInjectModalProps] =
    useState<Param2Props<any>["modalProps"]>();

  const onClose = useCallback(() => {
    setVisibleIds((beforeVids) => beforeVids.filter((id) => id !== modalId));
  }, []);

  const injectModalPropsHandler = useCallback(
    (injectParams: Param2Props<any>["modalProps"]) => {
      setInjectModalProps((oldProps: Param2Props<any>["modalProps"]) => ({
        ...oldProps,
        ...injectParams,
      }));
    },
    []
  );

  const onResolve = (value: unknown) => {
    resolve?.({ value, onClose });
    onClose();
  };

  const onReject = (err: any) => {
    reject?.(err);
    onClose();
  };

  const onOk = useCallback(async () => {
    const onSubmit = injectModalProps.onOk || injectModalProps.onOk || onClose;
    injectModalPropsHandler({ confirmLoading: true });
    try {
      const res = await onSubmit();
      onResolve(res);
    } catch (e) {
      reject?.(e);
    } finally {
      injectModalPropsHandler({ confirmLoading: false });
    }
  }, [injectModalProps]);

  const ModalInsContextValue = useMemo(
    () => ({
      onClose,
      injectModalProps: injectModalPropsHandler,
      onResolve,
      onReject,
    }),
    []
  );

  return (
    <ModalInsContext.Provider value={ModalInsContextValue}>
      <ModalComponent
        visible={visibleIds.includes(modalId)}
        onCancel={onClose}
        {...modalProps}
        {...injectModalProps}
        onOk={onOk}
      >
        <Component {...insProps} />
      </ModalComponent>
    </ModalInsContext.Provider>
  );
});

export const Portal = memo((props: PortalProps) => {
  const { visibleIds } = props;
  const { registerStore } = useContext(ModalContext);

  return (
    <>
      {registerStore.current.map((ins, idx) => (
        <Render key={idx} {...ins} visibleIds={visibleIds} />
      ))}
    </>
  );
});
