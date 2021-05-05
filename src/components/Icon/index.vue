<template>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  :aria-labelledby="iconName"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="slideshow-icon">
  <component :is="state.computedIconComponent"/>
</svg>
</template>

<script>
import { defineComponent, defineAsyncComponent, computed, reactive } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    iconName: { type: String, required: true },
  },
  setup(props)
  {
    let state = reactive({
      computedIconComponent: computed(() => {
        switch (props.iconName)
        {
          case 'grid':
            return defineAsyncComponent(() => import('./src/icon-grid'));
          case 'menu':
            return defineAsyncComponent(() => import('./src/icon-menu'));
          case 'arrow-left':
            return defineAsyncComponent(() => import('./src/icon-arrow-left'));
          case 'arrow-right':
            return defineAsyncComponent(() => import('./src/icon-arrow-right'));
          case 'arrow-up':
            return defineAsyncComponent(() => import('./src/icon-arrow-up'));
          case 'arrow-down':
            return defineAsyncComponent(() => import('./src/icon-arrow-down'));
          case 'frown':
            return defineAsyncComponent(() => import('./src/icon-frown'));
          case 'tool':
            return defineAsyncComponent(() => import('./src/icon-tool'));
          case 'droplet':
            return defineAsyncComponent(() => import('./src/icon-droplet'));
          case 'copy':
            return defineAsyncComponent(() => import('./src/icon-copy'));
          case 'database':
            return defineAsyncComponent(() => import('./src/icon-database'));
          case 'command':
            return defineAsyncComponent(() => import('./src/icon-command'));
          case 'check':
            return defineAsyncComponent(() => import('./src/icon-check'));
          case 'x':
            return defineAsyncComponent(() => import('./src/icon-x'));
          default:
            return null;
        }
      }),
    });
    return { state };
  },
});
</script>

<style lang="scss">
.slideshow-icon {
  display: block;
  width: var(--icon-size, 24px);
  height: var(--icon-size, 24px);
  stroke: var(--icon-color, #000);
  stroke-width: var(--icon-stroke, 2px);
}
</style>
