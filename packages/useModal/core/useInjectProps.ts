import { useContext } from "react";
import { ModalInsContext } from "./context";

export const useInjectProps = () => {
  const handler = useContext(ModalInsContext);

  return handler
};
