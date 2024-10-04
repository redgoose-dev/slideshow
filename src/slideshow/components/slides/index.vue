<template>
<div class="slides">
  <Images ref="$images"/>
<!--  <Caption/>-->
  <Controller/>
<!--  <Paginate/>-->
</div>
</template>

<script setup>
import { ref, computed, provide, reactive } from 'vue'
import { slidesStore, preferenceStore } from '../../store/index.js'
import Images from './images.vue'
import Caption from './caption.vue'
import Controller from './controller.vue'
import Paginate from './paginate.vue'

const preference = preferenceStore()
const slides = slidesStore()
const $images = ref()

// set provide
provide('slides', {
  change,
  // next,
  // prev,
})

// const computedSlides = computed(() => {
//   return slides.items
// })

function change(n)
{
  console.log('change slide', n)
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
