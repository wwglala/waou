import { Modal, SideSheet } from '@douyinfe/semi-ui';
import { ModalProvider } from '@waou/use-modal';
import { MYModal } from './test/Modal';
import { createContext, useEffect, useState } from 'react';

export const APPContext = createContext(0);

export default function App() {
  const [state, setState] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setState(state => state + 1);
  //   }, 1000);
  // }, [state]);

  return (
    <APPContext.Provider value={state}>
      <ModalProvider modal={Modal} sideSheet={SideSheet}>
        <MYModal />
      </ModalProvider>
    </APPContext.Provider>
  );
}
