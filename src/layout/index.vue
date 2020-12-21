<template>
  <section class="app-wrapper" :class="classObj">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" :show-logo="settings.showLogo" />
    <div :class="{hasTagsView: settings.needTagsView}" class="main-container">
      <div :class="{'fixed-header': settings.fixedHeader}">
        <navbar />
        123456789
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeUnmount, watch, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppProviderContext } from '@/components/AppProvider/useAppContext';
import { Sidebar, Navbar } from './components';
import '@/styles/sidebar.scss';

const WIDTH = 992;

const $_isMobile = (): boolean => {
  const rect = document.body.getBoundingClientRect();
  return rect.width - 1 < WIDTH;
};

export default defineComponent({
  name: 'Layout',

  components: { Sidebar, Navbar },

  setup() {
    const settings = {
      needTagsView: true,
      fixedHeader: true,
      showLogo: true
    };
    const app = useAppProviderContext();

    const device = computed(() => app.device);
    const sidebar = computed(() => app.sidebar);
    const classObj = computed(() => ({
      hideSidebar: sidebar.value.opened,
      openSidebar: sidebar.value.opened,
      withoutAnimation: sidebar.value.withoutAnimation,
      mobile: device.value === 'mobile'
    }));

    const handleClickOutside = () => {
      app.sidebar.withoutAnimation = false;
    };

    const { currentRoute } = useRouter();

    watch(() => unref(currentRoute), () => {
      if (device.value === 'mobile' && sidebar.value.opened) {
        handleClickOutside();
      }
    });

    /*
    * 窗口大小变化
    * */
    const resizeHandler = () => {
      if (!document.hidden) {
        const isMobile = $_isMobile();
        app.device = isMobile ? 'mobile' : 'desktop';
        if (isMobile) {
          app.sidebar.withoutAnimation = true;
        }
      }
    };

    window.addEventListener('resize', resizeHandler);

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler);
    });

    return {
      settings,
      classObj,
      device,
      sidebar,
      handleClickOutside
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
