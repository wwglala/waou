/* eslint-disable @typescript-eslint/ban-types */
import { Button } from '@douyinfe/semi-ui';
import { useModal } from '../hooks/useModal';
import { useInjectProps } from '@waou/use-modal';
import { useContext, useEffect, useState } from 'react';
import { APPContext } from '../App';

function Comp(state: { count: number }) {
  const { count } = state;
  const { setModalProps, onResolve } = useInjectProps();

  useEffect(() => {
    // setModalProps({
    //   onOk() {
    //     console.log(123123);
    //     onResolve();
    //   },
    // });
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          // setModalProps({ title: 'xxxxx' });
        }}
      >
        {count}
      </Button>
    </div>
  );
}

export function MYModal() {
  const [state, setState] = useState(0);

  const [dispatch] = useModal(
    Comp,
    {
      count: state,
      modalProps: { title: 'wwg' + state },
    },
    [state],
  );

  useEffect(() => {
    setTimeout(() => {
      setState(state => state + 1);
    }, 1000);
  }, [state]);

  return (
    <div>
      <Button
        onClick={() => {
          dispatch(true, { modalProps: { title: 'xxx' } }).then(res => {
            console.log(res);
          });
        }}
      >
        wwg
      </Button>
    </div>
  );
}
