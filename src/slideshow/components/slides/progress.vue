<template>
<p
  :class="[
    'progress',
    props.pause && 'pause',
  ]"
  :style="{
    '--duration': `${props.duration}ms`,
  }"></p>
</template>

<script setup>
const props = defineProps({
  current: Number,
  duration: Number,
  pause: Boolean,
})
</script>

<style lang="scss" scoped>
.progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 5px;
  background: var(--color-key);
  margin: 0;
  font-size: 0;
  transform-origin: 0 0;
  animation-name: progress-bar;
  animation-duration: var(--duration);
  animation-timing-function: linear;
  animation-play-state: running;
  &.pause {
    animation-play-state: paused;
  }
}
@keyframes progress-bar {
  0% {
    scale: 0 1;
  }
  100% {
    scale: 1 1;
  }
}
</style>