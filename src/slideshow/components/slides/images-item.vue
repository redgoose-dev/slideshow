<template>
<p v-if="props.error">
  <i>icon</i>
  <strong>message</strong>
</p>
<img
  v-else-if="props.loaded"
  :src="props.src"
  :alt="props.alt"
  @error="onError"/>
</template>

<script setup>
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
  if (!props.key) return
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
}
</style>
