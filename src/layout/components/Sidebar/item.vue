<template>
  <i v-if="icon.includes('el-icon')" :class="`${icon} sub-el-icon`"></i>
  <svg-icon v-else class-name="svg-icon" :icon-class="icon" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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

  setup() {
    return {};
  }
});
</script>
