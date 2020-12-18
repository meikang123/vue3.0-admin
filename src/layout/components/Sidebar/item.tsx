import { defineComponent, toRefs } from 'vue';

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
    const vNodes = [];

    if (icon.value) {
      if (icon.value.includes('el-icon')) {
        vNodes.push(<i class={[icon.value, 'sub-el-icon']} />);
      } else {
        vNodes.push(<svg-icon icon-class={icon.value}/>);
      }
    }

    if (title.value) {
      vNodes.push(<span v-slot='title'>{(title.value)}</span>);
    }
    return vNodes;
  }
});
