import { MutableRefObject } from 'react';
import { StaticModalStore } from './types';

export const updateAndSaveModal =
  (modalStoreRef: MutableRefObject<StaticModalStore<any>[]>) =>
  (instance: StaticModalStore<any>) => {
    const hasInstance = modalStoreRef.current.find(
      ins => ins.modalId === instance.modalId,
    );

    if (hasInstance) {
      modalStoreRef.current = modalStoreRef.current.map(oldIns => {
        if (oldIns.modalId === instance.modalId) {
          return {
            ...instance,
            props: {
              ...oldIns.props,
              ...instance.props,
              modalProps: {
                ...oldIns.props?.modalProps,
                ...instance.props?.modalProps,
              },
            },
          };
        }
        return oldIns;
      });
    } else {
      modalStoreRef.current = [...modalStoreRef.current, instance];
    }

    return () => {
      modalStoreRef.current.filter(ins => ins.modalId !== instance.modalId);
    };
  };
