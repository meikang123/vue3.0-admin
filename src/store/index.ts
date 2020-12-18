import type { App } from 'vue';
import { createStore } from 'vuex';
import { isDevMode } from '@/utils/is';

const isDev = isDevMode();

const store = createStore({
  strict: isDev
});

export function setupStore(app: App) {
  app.use(store);
}

export default store;
