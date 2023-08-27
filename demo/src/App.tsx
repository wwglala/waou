/* eslint-disable react-hooks/rules-of-hooks */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { List } from './pages/List';
import { useModal } from './hooks/useModal';
import { ModalProvider } from './hooks/useModal';
import { Modal, SideSheet } from '@douyinfe/semi-ui';
import { useInjectProps } from './hooks/useModal';
import { useEffect } from 'react';

function Layout() {
  useModal.useRegister('wwg', () => {
    const { setModalProps, onResolve } = useInjectProps();

    useEffect(() => {
      setModalProps((state: any) => {
        return {
          ...state,
          ...{
            async onOk() {
              return new Promise(resolve => {
                setTimeout(() => {
                  onResolve();
                  resolve('');
                }, 1000);
              });
            },
          },
        };
      });
    }, []);

    return <div>wwg</div>;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/list" element={<List></List>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ModalProvider modal={Modal} sideSheet={SideSheet} loadingField="loading">
      <Layout></Layout>
    </ModalProvider>
  );
}
