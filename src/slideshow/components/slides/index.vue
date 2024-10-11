<template>
<div
  class="slides"
  @mouseleave="onMouseLeave"
  @mouseenter="onMouseEnter"
  @click.prevent="onClickRoot">
  <Images/>
  <div :class="[
    'hud',
    showHud && 'use',
    preference.general.visibleHudHover && 'hover',
  ]">
    <Caption
      v-if="preference.general.hudContents.caption"
      class="slides__caption"/>
    <Controller
      v-if="preference.general.hudContents.controller"
      class="slides__controller"/>
    <Paginate
      v-if="preference.general.hudContents.paginate"
      class="slides__paginate"/>
    <slot v-if="preference.general.hudContents.slots"/>
  </div>
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
const showHud = ref(preference.general.hud)
const showHudHover = ref(preference.general.hud)
let timeoutId = undefined
let isPauseAutoplayHover = isPauseAutoplay.value

onMounted(() => startAutoplay())
onBeforeUnmount(() => clearAutoplay())
watch(() => globalState.autoplay, (sw) => {
  isPauseAutoplay.value = !sw
  if (sw) startAutoplay()
  else clearAutoplay()
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
  if (preference.slides.autoplayPauseOnHover)
  {
    if (isPauseAutoplayHover !== undefined) isPauseAutoplay.value = isPauseAutoplayHover
  }
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
  // turn on hud
  const { visibleHudClick } = preference.general
  if (visibleHudClick) showHudHover.value = false
  // start autoplay
  const { autoplayPauseOnHover } = preference.slides
  if (!autoplayPauseOnHover) return
  isPauseAutoplayHover = false
  startAutoplay()
}
function onMouseEnter()
{
  // turn off hud
  const { visibleHudClick } = preference.general
  if (visibleHudClick) showHudHover.value = true
  // stop autoplay
  const { autoplayPauseOnHover } = preference.slides
  if (!autoplayPauseOnHover) return
  isPauseAutoplayHover = true
  clearAutoplay()
}

function onClickRoot()
{
  if (!preference.general.visibleHudClick) return
  showHud.value = !showHud.value
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
