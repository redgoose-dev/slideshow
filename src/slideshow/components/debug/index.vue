<template>
<article class="debug">
  <pre class="status">{{status}}</pre>
</article>
</template>

<script setup>
import { computed } from 'vue'
import { slidesStore, preferenceStore, globalStateStore } from '../../store/index.js'

const slides = slidesStore()
const preference = preferenceStore()
const globalState = globalStateStore()

const status = computed(() => {
  return {
    'general.hud': preference.general?.hud,
    'general.visibleHudHover': preference.general?.visibleHudHover,
    'general.visibleHudClick': preference.general?.visibleHudClick,
    'general.hudContents': preference.general?.hudContents,
    // 'preference.slides.loop': preference.slides?.loop,
    // 'preference.slides.autoplay': preference.slides?.autoplay,
    // 'preference.keyboard': preference.keyboard,
    // 'globalState.autoplay': globalState.autoplay,
    // 'globalState.swipe': globalState.swipe,
    // 'slides.lock': slides.lock,
    'slides.active': slides.active,
  }
})
</script>

<style lang="scss" scoped>
.debug {
  position: absolute;
  z-index: 2;
  display: var(--slideshow-debug-display, none);
  margin: 0;
  left: 10px;
  bottom: 10px;
  background: color-mix(in hsl, var(--color-key), transparent 25%);
  backdrop-filter: blur(16px);
  border-radius: 8px;
  pointer-events: none;
  opacity: var(--slideshow-debug-opacity, 1);
  .status {
    padding: 4px 20px;
    font-family: 'Monaco', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 10px;
    line-height: 1.25;
  }
}
</style>
