import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  MutableRefObject,
  createContext,
  useContext,
} from "react";
import ReactDOM from "react-dom";

let initCount = 0;
const PROVIDER_SYMBOL = Symbol("ModalProvider_id");
const Context = createContext<ContextType>({
  modalContainer: { current: [] },
  updateModal: (f) => {},
  registerModal: (f) => {},
});
interface ModalConfig<T = any, V = any> {
  Dialog: T;
  Drawer: V;
}

interface ModalPortal<T> {
  modalStore: Array<ModalStore<T>>;
  modalRoot: React.RefObject<HTMLDivElement>;
  config: ModalConfig;
}

interface OutPropsType<T> {
  modalProps?: T;
  props?: any;
  [x: string]: any;
}

type Dispatch<T> = (visible: boolean, outProps?: OutPropsType<T>) => void;
type FirstParamType = ComponentType | ReactElement | FunctionComponent<any>;

interface ModalStore<T> {
  id: Symbol;
  visible: boolean;
  Component: FirstParamType;
  dispatch: (visible: boolean, props?: OutPropsType<T>) => void;
  modalProps?: T;
  props?: any;
}

interface ComponentType {
  type: "Dialog" | "Drawer";
  Component: ReactElement | FunctionComponent<any>;
}

export function useModal<T>(
  Component: FirstParamType,
  modalProps?: T,
  deps: Readonly<any[]> = []
): [Dispatch<T>] {
  const id = useMemo(() => Symbol("useModal_id"), []);
  const firstLoad = useRef(true);
  const context = useContext(Context);

  if (!context) {
    throw new Error(`useModal !

    please abide by React.Context usage, use the ModalProvider to init!
    like this: <ModalProvider>{children}</ModalProvider>
  `);
  }

  const { modalContainer, registerModal, updateModal } = context;

  const dispatch = (visible: boolean, outProps?: OutPropsType<T>) => {
    const {
      modalProps: dispatchModalProps,
      props,
      ...otherProps
    } = outProps || {};

    updateModal((store) => {
      return store.map((item) => {
        const selfVisible = item.id === id ? visible : item.visible;

        const outModalProps =
          item.id === id
            ? {
                // ...item.modalProps,
                ...modalProps,
                ...dispatchModalProps,
              }
            : item.modalProps;
        const outProps =
          item.id === id
            ? {
                // ...item.props,
                ...props,
                ...otherProps,
              }
            : item.props;

        const config = {
          ...item,
          visible: selfVisible,
          modalProps: outModalProps,
          props: outProps,
        };
        return config;
      });
    });
  };

  useLayoutEffect(() => {
    registerModal((store) => [
      ...store,
      {
        id,
        Component,
        visible: false,
        modalProps,
        dispatch,
      },
    ]);

    return () => {
      registerModal((store) => {
        return store.filter((item) => item.id !== id);
      });
    };
  }, []);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    const target = modalContainer.current.find((item) => item.id === id);
    const isShow = target?.visible;
    if (!isShow) {
      registerModal((store) => {
        return store.map((item) => {
          return {
            ...item,
            Component: item.id === id ? Component : item.Component,
          };
        });
      });
      return;
    }
    updateModal((store) => {
      return store.map((item) => {
        return {
          ...item,
          Component: item.id === id ? Component : item.Component,
        };
      });
    });
  }, deps);

  return [dispatch];
}

function Portal<T>(props: ModalPortal<T>) {
  const { modalStore, modalRoot, config } = props;

  const getModal = (
    Component
  ): { Modal: React.ComponentClass<any, any>; Component: ReactElement } => {
    if (React.isValidElement(Component)) {
      return { Modal: config.Dialog, Component };
    } else if (typeof Component === "function") {
      return { Modal: config.Dialog, Component: <Component /> };
    }
    const { type, Component: Com } = Component;
    const Modal = type === "Drawer" ? config.Drawer : config.Dialog;
    const Container = typeof Com === "function" ? <Com /> : Com;
    return { Modal, Component: Container };
  };

  return ReactDOM.createPortal(
    <>
      {modalStore.map((item, key) => {
        const { Component, visible, dispatch, modalProps, props } = item;
        const { Modal, Component: Com } = getModal(Component);
        const onClose = () => dispatch(false, { modalProps, props });
        return (
          <Modal
            key={key}
            onClose={onClose}
            onCancel={onClose}
            onOk={onClose}
            visible={visible}
            {...modalProps}
          >
            {React.cloneElement(Com, {
              ...props,
              dispatch,
              __onClose: onClose,
            })}
          </Modal>
        );
      })}
    </>,
    modalRoot.current!
  );
}

interface ModalProviderProps {
  config: ModalConfig;
  children?: any;
}
type Fn = (store: Array<ModalStore<any>>) => Array<ModalStore<any>>;
interface ContextType {
  modalContainer: MutableRefObject<Array<ModalStore<any>>>;
  registerModal: (f: Fn) => void;
  updateModal: (f: Fn) => void;
}
interface ModalProvider {
  (props: ModalProviderProps): JSX.Element;
  context?: ContextType;
}

export const ModalProvider: ModalProvider = (props: ModalProviderProps) => {
  const { config, children } = props;
  const modalContainer = useRef<Array<ModalStore<any>>>([]);
  const [modalStore, setModalStore] = useState<Array<ModalStore<any>>>(
    modalContainer.current
  );
  const modalRoot = useRef(document.createElement("div"));

  const updateModal = (f) => {
    modalContainer.current = f(modalContainer.current);
    setModalStore([...modalContainer.current]);
  };

  const registerModal = (f) => {
    modalContainer.current = f(modalContainer.current);
  };

  useMemo(() => {
    ModalProvider[PROVIDER_SYMBOL] = true;
    ModalProvider.context = {
      modalContainer,
      registerModal,
      updateModal,
    };
  }, []);

  useEffect(() => {
    modalRoot.current.id = `useModal_root_container${initCount++}`;
    document.body.append(modalRoot.current);
    return () => {
      modalRoot.current?.remove();
    };
  }, []);

  const modalAction = useMemo(
    () => ({ modalContainer, updateModal, registerModal }),
    []
  );

  return (
    <Context.Provider value={modalAction}>
      {children}
      <Portal config={config} modalStore={modalStore} modalRoot={modalRoot} />
    </Context.Provider>
  );
};
