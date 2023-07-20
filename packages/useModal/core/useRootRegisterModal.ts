import { MutableRefObject, useCallback } from 'react';
import { registerModalHandler, registerStoreInstance } from './types';

export const useRootRegisterModal = (
  registerStore: MutableRefObject<registerStoreInstance[]>,
) => {
  const registerModalInstance: registerModalHandler = useCallback(instance => {
    const hasInstance = registerStore.current.find(
      ins => ins.modalId === instance.modalId,
    );
    if (hasInstance) {
      // @todo modal props 需要更改，modalProps 可能不需要改变 ，实现 maybe 标记每一个props的key
      // 目前如果 dispatch 传递了 modalProps 则 freeze
      registerStore.current = registerStore.current.map(oldIns => {
        if (oldIns.modalId === instance.modalId) {
          let modalProps;
          if (
            oldIns.props.modalProps?.__freeze &&
            !instance.props.modalProps?.__freeze
          ) {
            modalProps = {
              ...instance.props.modalProps,
              ...oldIns.props.modalProps,
            };
          } else {
            modalProps = {
              ...oldIns.props.modalProps,
              ...instance.props.modalProps,
            };
          }

          return {
            ...instance,
            props: {
              ...oldIns.props,
              ...instance.props,
              modalProps,
            },
          };
        }
        return oldIns;
      });
    } else {
      registerStore.current = [...registerStore.current, instance];
    }

    return () => {
      registerStore.current.filter(ins => ins.modalId !== instance.modalId);
    };
  }, []);

  return registerModalInstance;
};
