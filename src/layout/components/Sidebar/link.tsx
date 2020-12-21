import { defineComponent } from 'vue';
import { isExternal } from '@/utils/is';

export default defineComponent({
  name: 'Link',

  props: {
    to: {
      type: String,
      required: true
    }
  },

  setup(props, { slots }) {
    const isLink = isExternal(props.to);
    const type = isLink ? 'a' : 'router-link';
    const bindProps = isLink ? { href: props.to, target: '_blank', rel: 'noopener' } : { to: props.to };

    return () => (
      <>
        {
          isLink && (<a {...bindProps}>
            {
              slots.default && slots.default()
            }
          </a>)
        }
        {
          !isLink && (<router-link {...bindProps}>
            {
              slots.default && slots.default()
            }
          </router-link>)
        }
      </>
    );
  }
});
