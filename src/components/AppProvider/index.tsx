import { defineComponent, ref, reactive } from 'vue';
import { isMobile } from '@/utils/is';

import { createAppProviderContext } from './useAppContext';

export default defineComponent({
  name: 'AppProvider',

  setup(props, { slots }) {
    const device: string = isMobile() ? 'mobile' : 'desktop';
    const deviceRef = ref(device);
    const sidebar = reactive({
      opened: true,
      withoutAnimation: isMobile()
    });

    createAppProviderContext({ sidebar, device: deviceRef });

    return () => (
      <>
        {
          slots.default && slots.default()
        }
      </>
    );
  }
});
