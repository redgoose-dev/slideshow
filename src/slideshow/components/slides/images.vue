<template>
<div class="images">
  <div class="wrap">
    <figure v-for="o in props.src">
      <ImageComp
        :src="o.src"
        :alt="o.title"/>
    </figure>
  </div>
  <i class="overlay"></i>
</div>
</template>

<script setup>
import { computed } from 'vue'
import ImageComp from './image.vue'

const props = defineProps({
  src: Array,
  loop: Boolean,
})

console.log(props.src)
</script>

<style src="./images.scss" lang="scss" scoped></style>
