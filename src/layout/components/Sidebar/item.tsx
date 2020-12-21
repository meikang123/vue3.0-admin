import { defineComponent, toRefs, h } from 'vue';

export default defineComponent({
  name: 'Item',

  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const { icon, title } = toRefs(props);
    const vNodes: any = [];

    if (icon.value) {
      if (icon.value.includes('el-icon')) {
        vNodes.push(h('i', {
          class: `${icon.value} sub-el-icon`
        }));
      } else {
        vNodes.push(h('svg-icon', {
          className: 'svg-icon',
          iconClass: icon.value
        }));
      }
    }
    if (title.value) {
      vNodes.push(h('span', {
        slot: 'title'
      }, title.value));
    }
    return () => h('span', {
      slot: 'title'
    }, title.value);
  }
});
