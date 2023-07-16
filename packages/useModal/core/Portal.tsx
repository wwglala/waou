import React, { memo, useCallback, useContext, useState } from "react";
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
    let _onOk = onClose;
    if (injectModalProps?.onOk) {
      _onOk = injectModalProps.onOk;
    } else if ((modalProps as any).onOk) {
      _onOk = (modalProps as any).onOk;
    }
    injectModalPropsHandler({ confirmLoading: true });
    let err;
    try {
      const res = await _onOk();
      onResolve(res);
    } catch (e) {
      err = e;
      reject?.(err);
    } finally {
      injectModalPropsHandler({ confirmLoading: false });
      // if (err) {
      //   throw err
      // }
    }
  }, [injectModalProps]);

  return (
    <ModalInsContext.Provider
      value={{
        onClose,
        injectModalProps: injectModalPropsHandler,
        onResolve,
        onReject,
      }}
    >
      <ModalComponent
        visible={visibleIds.includes(modalId)}
        onCancel={onClose}
        {...(modalProps as any)}
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
