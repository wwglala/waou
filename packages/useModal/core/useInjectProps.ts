import { useContext } from "react";
import { ModalInsContext } from "./context";

export const useInjectProps = <M>() => {
  const handler = useContext(ModalInsContext);

  return {
    ...handler,
    injectModalProps: (props: M) => handler.injectModalProps(props),
  };
};
