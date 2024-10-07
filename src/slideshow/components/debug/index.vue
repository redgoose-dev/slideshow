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
    'preference.slides.loop': preference.slides.loop,
    'preference.slides.autoplay': preference.slides.autoplay,
    'globalState.autoplay': globalState.autoplay,
    'globalState.swipe': globalState.swipe,
    'slides.active': slides.active,
    'slides.lock': slides.lock,
  }
})
</script>

<style lang="scss" scoped>
.debug {
  position: absolute;
  z-index: 2;
  display: block;
  margin: 0;
  left: 10px;
  bottom: 10px;
  border: 1px solid hsl(0 0% 50%);
  background: hsla(161 100% 50% / 75%);
  backdrop-filter: blur(16px);
  border-radius: 8px;
  pointer-events: none;
  .status {
    padding: 4px 20px;
    font-size: 11px;
    line-height: 1.25;
  }
}
</style>
