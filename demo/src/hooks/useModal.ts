import { ModalReactProps } from '@douyinfe/semi-ui/lib/es/modal';
import { initModalType } from '@waou/use-modal';

export const useModal = initModalType<ModalReactProps>('modal' as any);
