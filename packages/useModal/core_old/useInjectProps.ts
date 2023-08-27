import { useContext } from "react";
import { ModalInsContext } from "./context";

export const useInjectProps = <T>() => {
  const handler = useContext(ModalInsContext);

  return {
    ...handler,
    setModalProps: handler.setModalProps<T>
  }
};
