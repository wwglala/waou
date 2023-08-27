import React from 'react';
import { useModal } from '../hooks/useModal';
import { Button } from '@douyinfe/semi-ui';

export function Home() {
  const [dispatch] = useModal('wwg', { modalProps: { title: 'wwg' } }, []);

  return (
    <div>
      <Button
        onClick={() => {
          dispatch(true);
        }}
      >
        wwg
      </Button>
    </div>
  );
}
