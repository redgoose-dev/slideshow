<template>
<div
  class="slides"
  @mouseleave="onMouseLeave"
  @mouseenter="onMouseEnter">
  <Images/>
  <Caption/>
  <Controller/>
  <Paginate/>
  <Progress
    v-if="visibleProgressBar"
    :current="autoplayProgress"
    :duration="preference.slides.autoplayDelay"
    :pause="!autoplay"/>
</div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { slidesStore, preferenceStore, globalStateStore } from '../../store/index.js'
import Images from './images.vue'
import Caption from './caption.vue'
import Controller from './controller.vue'
import Paginate from './paginate.vue'
import Progress from './progress.vue'

const preference = preferenceStore()
const slides = slidesStore()
const globalState = globalStateStore()
const autoplay = ref(globalState.autoplay)
const autoplayProgress = ref(0)
let startTime = 0
let elapsedTime = 0
let animationFrameId = undefined
const visibleProgressBar = computed(() => {
  if (!preference.slides.autoplay) return false
  if (!globalState.autoplay) return false
  return !slides.lock
})

// TODO: 하아.. 이거 아무래도 requestAnimationFrame 말고 setTimeout 으로 바꿔야겠다.
// TODO: 틱이 많아서 성능에 부담스럽게 느껴지고 프로그레스 만들고 있는데 그냥 길이만 알면 똑같이 애니메이션 플레이시키면 그만이네 ㅠㅠ
// TODO: 열심히 만들었는데 다시 뜯어고쳐야겠다 ㅠㅠ

onMounted(() => {
  if (!preference.slides.autoplay || !globalState.autoplay) return
  startAutoplay()
})
onBeforeUnmount(() => stopAutoplay())
watch(() => globalState.autoplay, (sw) => {
  autoplay.value = sw
  if (sw) startAutoplay()
  else stopAutoplay()
})
watch(() => slides.lock, (sw) => {
  if (!globalState.autoplay) return
  if (sw) stopAutoplay()
  else startAutoplay()
})
watch(() => globalState.swipe, (sw) => {
  if (!globalState.autoplay) return
  if (sw) pauseAutoplay()
  else resumeAutoplay()
  autoplay.value = !sw
})

function startAutoplay()
{
  if (!(preference.slides.autoplay && globalState.autoplay && autoplay.value)) return
  elapsedTime = 0
  startTime = performance.now()
  autoplayNextFrame()
}
function stopAutoplay()
{
  if (!animationFrameId) return
  cancelAnimationFrame(animationFrameId)
  animationFrameId = undefined
}
function pauseAutoplay()
{
  cancelAnimationFrame(animationFrameId)
  elapsedTime += performance.now() - startTime
}
function resumeAutoplay()
{
  startTime = performance.now()
  autoplayNextFrame()
}
function autoplayNextFrame()
{
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  animationFrameId = requestAnimationFrame(autoplayTrigger)
}
function autoplayTrigger()
{
  const { autoplayDelay } = preference.slides
  const currentTime = performance.now()
  const totalElapsedTime = elapsedTime + (currentTime - startTime)
  autoplayProgress.value = Math.floor(Math.max(Math.min((totalElapsedTime / autoplayDelay) * 100, 100), 0))
  if (totalElapsedTime < autoplayDelay)
  {
    autoplayNextFrame()
  }
  else
  {
    elapsedTime = 0
    autoplayTick()
  }
}
function autoplayTick()
{
  if (!(preference.slides.autoplay && globalState.autoplay)) return
  const { autoplayDirection } = preference.slides
  slides[autoplayDirection ? 'next' : 'prev']()
}

function onMouseLeave(e)
{
  e.stopPropagation()
  const { autoplayPauseOnHover } = preference.slides
  if (globalState.autoplay && autoplayPauseOnHover)
  {
    autoplay.value = true
    resumeAutoplay()
  }
}
function onMouseEnter()
{
  const { autoplayPauseOnHover } = preference.slides
  if (globalState.autoplay && autoplayPauseOnHover)
  {
    autoplay.value = false
    pauseAutoplay()
  }
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
