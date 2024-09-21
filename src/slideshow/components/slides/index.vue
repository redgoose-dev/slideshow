<template>
<div class="slides">
  <Images
    :src="slides.items"
    :loop="true"/>
<!--  <Caption/>-->
<!--  <Controller/>-->
<!--  <Paginate/>-->
</div>
</template>

<script setup>
import { computed } from 'vue'
import { slidesStore } from '../../store/index.js'
import Images from './images.vue'
import Caption from './caption.vue'
import Controller from './controller.vue'
import Paginate from './paginate.vue'

const slides = slidesStore()

// const computedSlides = computed(() => {
//   return slides.items
// })
</script>

<style src="./index.scss" lang="scss" scoped></style>
