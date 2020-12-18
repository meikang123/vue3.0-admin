import { defineComponent } from 'vue';
import AppProvider from '@/components/AppProvider';

export default defineComponent({
  name: 'App',

  components: { AppProvider },

  setup() {
    return () => (
      <AppProvider>
        <router-view />
      </AppProvider>
    );
  }
});
