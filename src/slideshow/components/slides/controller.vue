<template>
<nav :class="[
  'controller',
  globalState.swipe && 'swipe',
]">
  <button
    type="button"
    :title="language.print('direction.prev')"
    :disabled="!usePrevButton"
    class="prev"
    @click.stop="onClickPrev">
    <Icon name="chevron-left"/>
  </button>
  <button
    type="button"
    :title="language.print('direction.next')"
    :disabled="!useNextButton"
    class="next"
    @click.stop="onClickNext">
    <Icon name="chevron-right"/>
  </button>
</nav>
</template>

<script setup>
import { computed } from 'vue'
import { preferenceStore, slidesStore, globalStateStore, languageStore } from '../../store/index.js'
import Icon from '../icon/index.vue'

const preference = preferenceStore()
const slides = slidesStore()
const globalState = globalStateStore()
const language = languageStore()
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
