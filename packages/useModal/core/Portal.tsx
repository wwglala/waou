import React, { memo, useCallback, useContext, useState } from "react";
import { ModalContext, ModalInsContext } from "./context";
import { Param2Props, registerStoreInstance } from "./types";

interface PortalProps {
  visibleIds: Symbol[];
}

interface RenderProps extends registerStoreInstance, PortalProps {}
const Render = memo((props: RenderProps) =>{
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
    useState<Param2Props<any>["modalProps"]>();

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
    onClose();
  };

  const onReject = (err: any) => {
    reject?.(err);
    onClose();
  };

  const onOk = useCallback(async () => {
    let _onOk = onClose
    if (injectProps?.onOk) {
      _onOk = injectProps.onOk
    } else if ((modalProps as any).onOk) {
      _onOk = (modalProps as any).onOk
    }
    injectModalProps({ confirmLoading: true })
    let err;
      try {
        const res = await _onOk()
        onResolve(res)
      } catch (e) {
        err = e
        onReject(e)
      } finally {
        injectModalProps({ confirmLoading: false })
        if (err) {
          throw err
        }
      }
  },[injectProps])

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
        {...(modalProps as any)}
        {...injectProps}
        onOk={onOk}
      >
        <Component {...insProps} />
      </ModalComponent>
    </ModalInsContext.Provider>
  );
})

export const Portal = memo((props: PortalProps)=> {
  const { visibleIds } = props;
  const { registerStore } = useContext(ModalContext);

  return (
    <>
      {registerStore.current.map((ins, idx) => (
        <Render key={idx} {...ins} visibleIds={visibleIds} />
      ))}
    </>
  );
})
