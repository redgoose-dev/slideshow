<template>
<nav class="controller">
  <button
    type="button"
    :disabled="!usePrevButton"
    @click="onClickPrev">
    PREV
  </button>
  <button
    type="button"
    :disabled="!useNextButton"
    @click="onClickNext">
    NEXT
  </button>
  <button
    type="button"
    @click="onClickChangeSlide">
    CHANGE
  </button>
</nav>
</template>

<script setup>
import { computed } from 'vue'
import { slidesStore } from '../../store/index.js'

const slides = slidesStore()
const usePrevButton = computed(() => {
  return true
})
const useNextButton = computed(() => {
  return true
})

function onClickPrev()
{
  slides.prev()
}

function onClickNext()
{
  slides.next()
}

function onClickChangeSlide()
{
  const key = prompt('슬라이드 키 이름??')
  if (!key) return
  slides.change(key)
}
</script>

<style src="./controller.scss" lang="scss" scoped></style>
