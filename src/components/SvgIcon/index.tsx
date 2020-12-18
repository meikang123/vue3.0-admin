import { defineComponent, computed, h } from 'vue';
import Svg from './index.module.scss';

export default defineComponent({
  name: 'SvgIcon',

  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },

  setup(props, { attrs }) {
    const svgClass = computed(() => {
      if (props.className) {
        return `${Svg.svgIcon} ${props.className}`;
      }
      return Svg.svgIcon;
    });

    const iconName = computed(() => `#icon-${props.iconClass}`);

    return () => h('svg', {
      class: svgClass.value,
      'aria-hidden': true,
      ...attrs
    }, [
      h('use', {
        'xlink:href': iconName.value
      })
    ]);
  }
});
