<template>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  :aria-labelledby="props.iconName"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="slideshow-icon">
  <component :is="state.computedIconComponent"/>
</svg>
</template>

<script setup>
import { defineAsyncComponent, computed, reactive } from 'vue';

const name = 'Icon';
const props = defineProps({
  iconName: { type: String, required: true },
});
let state = reactive({
  computedIconComponent: computed(() => {
    switch (props.iconName)
    {
      case 'menu':
        return defineAsyncComponent(() => import('./src/icon-menu.vue'));
      case 'menu-flat':
        return defineAsyncComponent(() => import('./src/icon-menu-flat.vue'));
      case 'arrow-left':
        return defineAsyncComponent(() => import('./src/icon-arrow-left.vue'));
      case 'arrow-right':
        return defineAsyncComponent(() => import('./src/icon-arrow-right.vue'));
      case 'arrow-up':
        return defineAsyncComponent(() => import('./src/icon-arrow-up.vue'));
      case 'arrow-down':
        return defineAsyncComponent(() => import('./src/icon-arrow-down.vue'));
      case 'frown':
        return defineAsyncComponent(() => import('./src/icon-frown.vue'));
      case 'tool':
        return defineAsyncComponent(() => import('./src/icon-tool.vue'));
      case 'droplet':
        return defineAsyncComponent(() => import('./src/icon-droplet.vue'));
      case 'copy':
        return defineAsyncComponent(() => import('./src/icon-copy.vue'));
      case 'database':
        return defineAsyncComponent(() => import('./src/icon-database.vue'));
      case 'command':
        return defineAsyncComponent(() => import('./src/icon-command.vue'));
      case 'check':
        return defineAsyncComponent(() => import('./src/icon-check.vue'));
      case 'x':
        return defineAsyncComponent(() => import('./src/icon-x.vue'));
      case 'upload':
        return defineAsyncComponent(() => import('./src/icon-upload.vue'));
      case 'file':
        return defineAsyncComponent(() => import('./src/icon-file.vue'));
      case 'info':
        return defineAsyncComponent(() => import('./src/icon-info.vue'));
      case 'play-circle':
        return defineAsyncComponent(() => import('./src/icon-play-circle.vue'));
      case 'download':
        return defineAsyncComponent(() => import('./src/icon-download.vue'));
      case 'edit':
        return defineAsyncComponent(() => import('./src/icon-edit.vue'));
      case 'plus':
        return defineAsyncComponent(() => import('./src/icon-plus.vue'));
      case 'folder':
        return defineAsyncComponent(() => import('./src/icon-folder.vue'));
      case 'minus':
        return defineAsyncComponent(() => import('./src/icon-minus.vue'));
      default:
        return null;
    }
  }),
});
</script>

<style lang="scss" scoped>
.slideshow-icon {
  display: block;
  width: var(--icon-size, 24px);
  height: var(--icon-size, 24px);
  stroke: var(--icon-color, #000);
  stroke-width: var(--icon-stroke, 2px);
}
</style>
