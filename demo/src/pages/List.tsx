import { Button } from '@douyinfe/semi-ui';
import { useModal } from '../hooks/useModal';

export function List() {
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
