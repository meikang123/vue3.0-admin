<template>
  <div :class="{'has-logo': showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permissionRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppProviderContext } from '@/components/AppProvider/useAppContext';
import { permissionStore } from '@/store/modules/permission';
import variables from '@/styles/variables.scss';
import Logo from './logo.vue';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
  name: 'Sidebar',

  components: { Logo, SidebarItem },

  props: {
    showLogo: {
      type: Boolean,
      default: true
    }
  },

  setup() {
    const appContext = useAppProviderContext();
    const isCollapse = computed(() => appContext.sidebar.opened);
    const { currentRoute } = useRouter();
    const activeMenu = computed(() => {
      const route = unref(currentRoute);
      const { path } = route;
      return path;
    });

    const permissionRoutes = computed(() => permissionStore.getMenuListState);

    return {
      variables,
      isCollapse,
      activeMenu,
      permissionRoutes
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
