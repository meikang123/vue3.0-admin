<template>
  <div v-if="!item.hidden">
    123
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SidebarItem',

  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },

  setup() {

  }
});
</script>

<style lang="scss" scoped>

</style>
