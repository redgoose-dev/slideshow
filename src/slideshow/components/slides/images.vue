<template>
<div
  ref="$root"
  :class="[
    'images',
    `mode--${preference.slides?.transitionType}`,
    globalState.playedSlide && 'animation-play',
    globalState.playedSlideCancel && 'animation-cancel',
    globalState.swipe && 'swipe',
  ]"
  :style="rootStyles"
  @pointerdown.stop="onPointerStart"
  @pointermove.stop="onPointerMove"
  @pointerup.stop="onPointerEnd"
  @pointerleave="onMouseLeave"
  @contextmenu="onContextMenu">
  <ul ref="$body" class="body">
    <li v-if="showFirstSlide" class="slide-first">
      <ImagesItem
        key-name="first-slide-image"
        :loaded="showFirstSlide.loaded"
        :src="showFirstSlide.src"
        :error="showFirstSlide.error"/>
    </li>
    <li
      v-for="(item, key) in state.items"
      :ref="el => { $image[key] = el }"
      :class="[
        (!!state.classNameActive && state.active === key) && state.classNameActive,
        (!!state.classNamePrevActive && state.prevActive === key) && state.classNamePrevActive,
      ]">
      <ImagesItem
        :key-name="key"
        :loaded="item.loaded"
        :src="item.src"
        :alt="item.alt"
        :error="item.error"
        @error="onErrorImage"/>
    </li>
    <li v-if="showLastSlide" class="slide-last">
      <ImagesItem
        key-name="last-slide-image"
        :loaded="showLastSlide.loaded"
        :src="showLastSlide.src"
        :error="showLastSlide.error"/>
    </li>
  </ul>
  <i class="overlay" draggable="false"></i>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { preferenceStore, slidesStore, globalStateStore } from '../../store/index.js'
import { TRANSITION_TYPE } from '../../libs/keywords.js'
import { sleep } from '../../libs/util.js'
import ImagesItem from './images-item.vue'

const preference = preferenceStore()
const slides = slidesStore()
const globalState = globalStateStore()
const emits = defineEmits([
  'change',
  'transition-start',
  'transition-end',
  'short-touch',
])
const $root = ref()
const $image = ref({})
const $body = ref()
const state = reactive({
  items: slides.order.reduce((acc, key) => {
    const item = slides.data.get(key)
    acc[key] = {
      src: item.src,
      alt: item.title,
      loaded: false,
      error: false,
    }
    return acc
  }, {}),
  classNameActive: 'active',
  classNamePrevActive: '',
  active: '',
  prevActive: '',
  swipePosX: NaN,
})
const rootStyles = computed(() => {
  if (slides.order.indexOf(state.active) <= -1) return
  let style = {}
  switch (preference.slides.transitionType)
  {
    case TRANSITION_TYPE.FADE:
      break
    case TRANSITION_TYPE.HORIZONTAL:
      style[`--speed-transition`] = `${preference.slides.transitionSpeed}ms`
      switch (state.prevActive)
      {
        case 'first':
          style[`--active-column`] = 0
          break
        case 'last':
          style[`--active-column`] = slides.order.length + 1
          break
        default:
          if (slides.order.length > 1)
          {
            style[`--active-column`] = getSlideIndex(state.prevActive || state.active)
            if (preference.slides.loop) style[`--active-column`]++
          }
          else
          {
            style[`--active-column`] = 0
          }
          break
      }
      if (!isNaN(state.swipePosX))
      {
        style[`--swipe-pos-x`] = `${state.swipePosX}%`
      }
      break
  }
  return style
})
const showFirstSlide = computed(() => {
  if (preference.slides.transitionType !== 'horizontal') return false
  if (!preference.slides.loop) return false
  if (slides.order.length <= 1) return false
  const item = state.items[slides.order[slides.order.length - 1]]
  return {
    src: item.src,
    loaded: item.loaded,
    error: item.error,
  }
})
const showLastSlide = computed(() => {
  if (preference.slides.transitionType !== 'horizontal') return false
  if (!preference.slides.loop) return false
  if (slides.order.length <= 1) return false
  const item = state.items[slides.order[0]]
  return {
    src: item.src,
    loaded: item.loaded,
    error: item.error,
  }
})
let pointer = {
  touched: false,
  dist: 0,
  startX: 0,
  startTime: null,
}

onMounted(() => {
  state.active = slides.active
  updateLoadedFromItems(slides.order, slides.order.indexOf(state.active), preference.slides.loop)
})
watch(() => slides.active, async (value) => {
  if (slides.order.length <= 1) return
  await run(value)
})

/**
 * run slide transition
 * @param {string} key
 * @return {Promise<void>}
 */
async function run(key)
{
  const { transitionType, loop } = preference.slides
  emits('transition-start')
  switch (transitionType)
  {
    case TRANSITION_TYPE.NONE:
      state.active = key
      updateLoadedFromItems(slides.order, slides.order.indexOf(state.active), loop)
      emits('transition-end')
      break
    case TRANSITION_TYPE.FADE:
      slides.lock = true
      globalState.playedSlide = true
      state.prevActive = state.active
      state.classNamePrevActive = 'fade-out'
      state.active = key
      state.classNameActive = 'fade-in hide'
      await sleep(20)
      state.classNameActive = 'fade-in'
      $image.value[state.active]?.addEventListener('transitionend', onTransitionEnd, { once: true })
      break
    case TRANSITION_TYPE.HORIZONTAL:
      slides.lock = true
      globalState.playedSlide = true
      const idx = {
        prev: getSlideIndex(state.active),
        next: getSlideIndex(key),
      }
      if (loop)
      {
        // 이전꺼 0, 다음꺼 마지막
        if (idx.prev === 0 && idx.next >= slides.order.length - 1)
        {
          state.prevActive = 'first'
        }
        // 이전꺼 마지막, 다음꺼 0
        else if (idx.prev >= slides.order.length - 1 && idx.next === 0)
        {
          state.prevActive = 'last'
        }
        else
        {
          state.prevActive = ''
        }
      }
      state.active = key
      $body.value.addEventListener('transitionend', onTransitionEnd, { once: true })
      break
  }
}
function onTransitionEnd()
{
  const { transitionType, loop } = preference.slides
  switch (transitionType)
  {
    case TRANSITION_TYPE.FADE:
      state.prevActive = ''
      state.classNamePrevActive = ''
      state.classNameActive = 'active'
      globalState.playedSlide = false
      slides.lock = false
      updateLoadedFromItems(slides.order, slides.order.indexOf(state.active), loop)
      emits('transition-end')
      break
    case TRANSITION_TYPE.HORIZONTAL:
      globalState.playedSlide = false
      state.prevActive = ''
      slides.lock = false
      updateLoadedFromItems(slides.order, slides.order.indexOf(state.active), loop)
      emits('transition-end')
      break
  }
}

function cancelRunning()
{
  globalState.playedSlideCancel = true
  $body.value.addEventListener('transitionend', onCancelRunningTransitionEnd, { once: true })
}
function onCancelRunningTransitionEnd()
{
  globalState.playedSlideCancel = false
}

function getSlideIndex(key)
{
  const idx = slides.order.indexOf(key)
  return idx > -1 ? idx : undefined
}

/**
 * 주변 슬라이드 loaded 값을 true로 바꿔준다.
 * @param {string[]} arr
 * @param {number} pickIndex
 * @param {boolean} loop
 * @param {number} scope
 */
function updateLoadedFromItems(arr, pickIndex, loop, scope = 2)
{
  const length = arr.length
  for (let i = (0-scope); i <= scope; i++)
  {
    let idx = pickIndex + i
    if (idx < 0)
    {
      if (loop) idx = length + idx
      else continue
    }
    else if (idx >= length)
    {
      if (loop) idx = idx % length
      else continue
    }
    if (state.items[arr[idx]])
    {
      state.items[arr[idx]].loaded = true
    }
  }
}
function onErrorImage(key)
{
  if (state.items[key]) state.items[key].error = true
}

function onPointerStart(e)
{
  if (e.pointerType === 'touch') pointer.touched = true
  if (globalState.playedSlide) return
  if (!preference.slides.swipe) return
  if (preference.slides.transitionType !== TRANSITION_TYPE.HORIZONTAL) return
  if (slides.order.length <= 2) return
  pointer.dist = 0
  pointer.startX = e.clientX || e.pageX
  const disableOffset = 50
  if (pointer.startX < disableOffset || pointer.startX > screen.width - disableOffset) return
  pointer.startTime = new Date().getTime()
  globalState.swipe = true
}
function onPointerMove(e)
{
  if (!globalState.swipe) return
  if (slides.order.length <= 2) return
  pointer.moveX = e.clientX || e.pageX
  const containerWidth = $root.value.offsetWidth
  const dist = pointer.moveX - pointer.startX
  const offset = preference.slides.loop ? 1 : 0
  state.swipePosX = (dist / containerWidth * 100) + (0 - (100 * (getSlideIndex(state.active) + offset)))
}
function onPointerEnd(e)
{
  if (!globalState.swipe) return
  if (slides.order.length <= 2) return

  const containerWidth = $root.value.offsetWidth
  pointer.endX = e.clientX || e.pageX
  const dir = pointer.startX > pointer.endX // true is next
  const elapsedTime = new Date().getTime() - pointer.startTime
  const distPos = pointer.endX - pointer.startX
  const percent = Math.abs(distPos) / containerWidth * 100

  // unset values
  pointer.dist = 0
  pointer.startX = undefined
  pointer.startTime = undefined
  pointer.moveX = undefined
  pointer.endX = undefined
  globalState.swipe = false
  state.swipePosX = NaN

  if (elapsedTime < 60 || percent < 1)
  {
    globalState.isClickSlide = true
    return
  }
  globalState.isClickSlide = false

  // `loop`가 아니고 첫번째와 마지막 슬라이드일 경우
  if (!preference.slides.loop)
  {
    if (dir)
    {
      if (slides.activeIndex === slides.data.size - 1)
      {
        cancelRunning()
        return
      }
    }
    else
    {
      if (slides.activeIndex === 0)
      {
        cancelRunning()
        return
      }
    }
  }

  // 슬라이드가 다음, 이전으로 넘어가거나 최소된다.
  if (elapsedTime > 300)
  {
    // 긴 터치
    if (percent > 30) slides[dir ? 'next' : 'prev']()
    else cancelRunning()
  }
  else
  {
    // 짧은 터치
    if (percent > 5) slides[dir ? 'next' : 'prev']()
    else cancelRunning()
  }
}
function onMouseLeave()
{
  if (globalState.swipe) cancelRunning()
  globalState.swipe = false
  state.swipePosX = NaN
}
function onContextMenu()
{
  globalState.swipe = false
  state.swipePosX = NaN
}
</script>

<style src="./images.scss" lang="scss" scoped></style>
