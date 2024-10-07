<template>
<div
  class="slides"
  @mouseleave="onMouseLeave"
  @mouseenter="onMouseEnter">
  <Images/>
  <Caption/>
  <Controller/>
  <Paginate/>
  <slot/>
</div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { slidesStore, preferenceStore, globalStateStore } from '../../store/index.js'
import Images from './images.vue'
import Caption from './caption.vue'
import Controller from './controller.vue'
import Paginate from './paginate.vue'

const preference = preferenceStore()
const slides = slidesStore()
const globalState = globalStateStore()
const isPauseAutoplay = ref(!globalState.autoplay)
let timeoutId = undefined
let isPauseAutoplayHover = isPauseAutoplay.value

onMounted(() => startAutoplay())
onBeforeUnmount(() => clearAutoplay())
watch(() => globalState.autoplay, (sw) => {
  isPauseAutoplay.value = !sw
})
watch(() => slides.lock, (sw) => {
  isPauseAutoplay.value = sw
  if (sw) clearAutoplay()
  else startAutoplay()
})
watch(() => globalState.swipe, (sw) => {
  isPauseAutoplay.value = sw
  if (sw) clearAutoplay()
  else startAutoplay()
})

function startAutoplay()
{
  if (isPauseAutoplayHover !== undefined) isPauseAutoplay.value = isPauseAutoplayHover
  if (!(preference.slides.autoplay && globalState.autoplay && !isPauseAutoplay.value)) return
  clearAutoplay()
  timeoutId = setTimeout(triggerTick, preference.slides.autoplayDelay)
}
function clearAutoplay()
{
  if (!timeoutId) return
  clearTimeout(timeoutId)
  timeoutId = undefined
}
function triggerTick()
{
  if (!globalState.autoplay) return
  const { autoplayDirection } = preference.slides
  if (autoplayDirection) slides.next()
  else slides.prev()
}

function onMouseLeave(e)
{
  e.stopPropagation()
  const { autoplayPauseOnHover } = preference.slides
  if (!autoplayPauseOnHover) return
  isPauseAutoplayHover = false
  startAutoplay()
}
function onMouseEnter()
{
  const { autoplayPauseOnHover } = preference.slides
  if (!autoplayPauseOnHover) return
  isPauseAutoplayHover = true
  clearAutoplay()
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
