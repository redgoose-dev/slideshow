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
import { computed, provide } from 'vue'
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

// TODO: 나중에 지울예정
function onClickChangeSlide()
{
  const key = prompt('슬라이드 키 이름??')
  if (!key) return
  slides.change(key)
}
</script>

<style src="./controller.scss" lang="scss" scoped></style>
