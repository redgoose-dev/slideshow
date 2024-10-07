<template>
<nav :class="[
  'controller',
  globalState.swipe && 'swipe',
]">
  <button
    type="button"
    title="prev slide"
    :disabled="!usePrevButton"
    class="prev"
    @click="onClickPrev">
    <Icon name="chevron-left"/>
  </button>
  <button
    type="button"
    title="next slide"
    :disabled="!useNextButton"
    class="next"
    @click="onClickNext">
    <Icon name="chevron-right"/>
  </button>
</nav>
</template>

<script setup>
import { computed } from 'vue'
import { preferenceStore, slidesStore, globalStateStore } from '../../store/index.js'
import Icon from '../icon/index.vue'

const preference = preferenceStore()
const slides = slidesStore()
const globalState = globalStateStore()
const usePrevButton = computed(() => {
  if (preference.slides.loop) return true
  return 0 < slides.activeIndex
})
const useNextButton = computed(() => {
  if (preference.slides.loop) return true
  return slides.order.length - 1 > slides.activeIndex
})

function onClickPrev()
{
  slides.prev()
}
function onClickNext()
{
  slides.next()
}
</script>

<style src="./controller.scss" lang="scss" scoped></style>
