import { App } from 'vue';

const contextFiles = require.context('./modules', false, /\.ts$/);
const ServiceMap: {[propName: string]: any} = {};
contextFiles.keys().forEach(key => {
  const serviceName = key.replace(/\.\//, '').replace(/_?\.js$/, '');
  ServiceMap[serviceName] = contextFiles(key).default;
});

const Api = ServiceMap;

export { Api };

export default {
  install(app: App) {
    app.config.globalProperties.$api = ServiceMap;
  }
};
