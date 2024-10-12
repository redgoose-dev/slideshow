<template>
<p v-if="props.error">
  <i><Icon name="cloud-rain-wind"/></i>
  <span>no image</span>
</p>
<img
  v-if="props.loaded"
  :src="props.src"
  :alt="props.alt"
  :style="imageStyle"
  @error="onError"/>
</template>

<script setup>
import { computed } from 'vue'
import { preferenceStore } from '../../store/index.js'
import Icon from '../icon/index.vue'

const preference = preferenceStore()
const props = defineProps({
  keyName: String,
  loaded: Boolean,
  src: String,
  alt: String,
  error: Boolean,
})
const emits = defineEmits([ 'error' ])
const imageStyle = computed(() => {
  const { imageScale, imageType } = preference.style
  return {
    '--w': imageScale[0],
    '--h': imageScale[1],
    '--fit': imageType,
  }
})

function onError()
{
  emits('error', props.keyName)
}
</script>

<style lang="scss" scoped>
img {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: 100%;
  height: 100%;
  max-width: var(--w, 100%);
  max-height: var(--h, 100%);
  object-fit: var(--fit, 'cover');
}
p {
  margin: 0;
  display: grid;
  width: 100%;
  height: 100%;
  place-content: center;
  justify-items: center;
  user-select: none;
  pointer-events: none;
  i {
    display: block;
    --icon-size: 75px;
    --icon-stroke: .75;
    --icon-color: var(--color-danger);
  }
  span {
    display: block;
    margin: 8px 0 16px;
    line-height: 1.4;
    font-size: 12px;
    font-weight: 400;
    color: var(--color-low-fill);
    letter-spacing: -.25px;
    text-transform: uppercase;
  }
}
</style>
