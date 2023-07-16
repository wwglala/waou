import { useContext, useEffect } from "react";
import { ModalInsContext } from "./context";

export const useInjectProps = <M>() => {
  const handler = useContext(ModalInsContext);

  const useInjectModalProps = (props: M, deps = []) => {
    useEffect(() => {
      handler.injectModalProps(props);
    }, deps);
  };

  return {
    ...handler,
    useInjectModalProps,
  };
};
