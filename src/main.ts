import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';

import App from './App';

import router, { setupRouter } from './router';
import { setupStore } from './store';

import { setupGlobDirectives } from './directives';
import addSvg from './icons';

import { isDevMode } from './utils/is';
import './registerServiceWorker';

import './styles/index.scss';

const app = createApp(App);

// 配置route
setupRouter(app);

// 配置vuex
setupStore(app);

// 配置directives
setupGlobDirectives(app);

// 配置SVG
app.use(addSvg);

// 加载UI库
app.use(ElementPlus, { size: 'small', zIndex: 10000, locale });

// 等待路由完成挂载
router.isReady().then(() => {
  app.mount('#app');
});

if (isDevMode()) {
  app.config.performance = true;
  window.__APP__ = app;
}
