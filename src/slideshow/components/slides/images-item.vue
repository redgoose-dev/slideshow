<template>
<p v-if="props.error">
  <i>
    <Icon name="x"/>
  </i>
  <span>no image</span>
</p>
<img
  v-if="props.loaded"
  :src="props.src"
  :alt="props.alt"
  @error="onError"/>
</template>

<script setup>
import Icon from '../icon/index.vue'

const props = defineProps({
  keyName: String,
  loaded: Boolean,
  src: String,
  alt: String,
  error: Boolean,
})
const emits = defineEmits([ 'error' ])

function onError()
{
  emits('error', props.keyName)
}
</script>

<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
    --icon-size: 120px;
    --icon-stroke: .25;
    --icon-color: var(--color-danger);
  }
  span {
    display: block;
    margin: -8px 0 16px;
    line-height: 1.4;
    font-size: 14px;
    font-weight: 400;
    color: var(--color-low-fill);
    letter-spacing: -.25px;
    text-transform: uppercase;
  }
}
</style>
