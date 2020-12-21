<template>
  <div v-if="!item.hidden">
    <template v-if="isOneShowingChild && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
          <template #title>
            <span>{{ onlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :ref="subMenuRef" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType, onMounted } from 'vue';
import type { AppRouteModule } from '@/router/types.d';
import { isExternal } from '@/utils/is';
import { useAppProviderContext } from '@/components/AppProvider/useAppContext';
import Item from './item.vue';
import AppLink from './link';

interface SidebarRoute extends AppRouteModule {
  noShowingChildren?: boolean;
}

export default defineComponent({
  name: 'SidebarItem',

  components: { Item, AppLink },

  props: {
    item: {
      type: Object as PropType<AppRouteModule>,
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

  setup(props) {
    const app = useAppProviderContext();
    const subMenuRef = ref<any>(null);
    const onlyOneChild = ref<Nullable<SidebarRoute>>(null);
    const isOneShowingChild = computed(() => {
      const { children = [] } = props.item;
      const showingChildren = children.filter(route => {
        if (route.hidden) {
          return false;
        }
        onlyOneChild.value = route;
        return true;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...props.item, path: '', noShowingChildren: true };
        return true;
      }

      return false;
    });
    const resolvePath = (path: string) => {
      if (isExternal(path)) {
        return path;
      }
      if (isExternal(props.basePath)) {
        return props.basePath;
      }

      return props.basePath + path;
    };
    onMounted(() => {
      if (subMenuRef.value) {
        const { handleMouseleave } = subMenuRef.value;
        subMenuRef.value.handleMouseleave = (e: any) => {
          if (app.device === 'mobile') {
            return;
          }
          handleMouseleave(e);
        };
      }
    });
    return {
      subMenuRef,
      onlyOneChild,
      isOneShowingChild,
      resolvePath
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
