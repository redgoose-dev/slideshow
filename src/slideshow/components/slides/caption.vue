<template>
<article class="caption" :style="styles">
  <template v-if="isShuffle">
    <h1 v-if="typos.title" ref="$title"></h1>
    <p v-if="typos.description" ref="$description"></p>
  </template>
  <template v-else>
    <h1 v-if="typos.title">{{typos.title}}</h1>
    <p v-if="typos.description">{{typos.description}}</p>
  </template>
</article>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { preferenceStore, slidesStore } from '../../store/index.js'
import { CAPTION_ANIMATION_TYPE } from '../../libs/keywords.js'

const preference = preferenceStore()
const slides = slidesStore()
const styles = computed(() => {
  let style = {}
  return style
})
const typos = computed(() => {
  const { title, description } = slides.data.get(slides.active)
  return { title, description }
})
const isShuffle = computed(() => {
  return preference.slides.captionAnimationType === CAPTION_ANIMATION_TYPE.SHUFFLE
})

onMounted(() => {
  if (!isShuffle.value) return
})
watch(() => slides.active, (value, oldValue) => {
  if (!isShuffle.value) return
})
</script>

<style src="./caption.scss" lang="scss" scoped></style>
