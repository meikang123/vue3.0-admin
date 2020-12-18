import { App } from 'vue';
import SvgIcon from '@/components/SvgIcon';

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
requireAll(req);

interface Plugin {
  install: any;
}

const addSvg: Plugin = {
  install(app: App) {
    app.component('SvgIcon', SvgIcon);
  }
};

export default addSvg;
