<template>
<img
  v-if="true"
  :src="props.src"
  :alt="props.alt">
<figcaption v-else>
  error
</figcaption>
</template>

<script setup>
const props = defineProps({
  src: String,
  alt: String,
})
</script>

<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
  height: 100%;
}
figcaption {}
</style>
