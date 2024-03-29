import { useEffect, useRef } from 'react';

export const useNotUnmount = <T>(cb: () => void, deps: Readonly<Array<T>> = []) => {
  const unmount = useRef(false);

  useEffect(
    () => () => {
      unmount.current = true;
    },
    []
  );

  useEffect(
    () => () => {
      if (unmount.current) {
        cb();
      }
    },
    deps
  );
};
