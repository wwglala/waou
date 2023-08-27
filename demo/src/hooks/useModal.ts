import { ModalReactProps } from '@douyinfe/semi-ui/lib/es/modal';
import { SideSheetReactProps } from '@douyinfe/semi-ui/lib/es/sideSheet';
import { createModalHook } from './core2/createModalHook';
import { MODAL_TYPE } from './core2/constants';
export * from './core2/useInjectProps';
export * from './core2/ModalProvider';

export const useModal = createModalHook<ModalReactProps>(MODAL_TYPE.MODAL);
export const useSideSheet = createModalHook<SideSheetReactProps>(
  MODAL_TYPE.SIDE_SHEET,
);
