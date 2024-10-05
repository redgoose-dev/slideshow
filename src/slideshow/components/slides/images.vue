<template>
<div
  ref="$root"
  :class="[
    'images',
    `mode--${preference.slides.transitionType}`,
    globalState.playedSlide && 'animation-play',
    globalState.playedSlideCancel && 'animation-cancel',
    globalState.swipe && 'swipe',
  ]"
  :style="rootStyles"
  @touchstart="onPointerStart"
  @touchmove="onPointerMove"
  @touchend="onPointerEnd"
  @mousedown="onPointerStart"
  @mousemove="onPointerMove"
  @mouseup="onPointerEnd"
  @mouseleave="onMouseLeave"
  @mouseenter="onMouseEnter"
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
  <i class="overlay"></i>
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
const props = defineProps({})
const emits = defineEmits([
  'change',
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
          style[`--active-column`] = getSlideIndex(state.prevActive || state.active)
          if (preference.slides.loop) style[`--active-column`]++
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
  switch (preference.slides.transitionType)
  {
    case TRANSITION_TYPE.NONE:
      state.active = key
      updateLoadedFromItems(slides.order, slides.order.indexOf(state.active), preference.slides.loop)
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
      if (preference.slides.loop)
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
  switch (preference.slides.transitionType)
  {
    case TRANSITION_TYPE.FADE:
      state.prevActive = ''
      state.classNamePrevActive = ''
      state.classNameActive = 'active'
      globalState.playedSlide = false
      slides.lock = false
      updateLoadedFromItems(slides.order, slides.order.indexOf(state.active), preference.slides.loop)
      break
    case TRANSITION_TYPE.HORIZONTAL:
      globalState.playedSlide = false
      state.prevActive = ''
      slides.lock = false
      updateLoadedFromItems(slides.order, slides.order.indexOf(state.active), preference.slides.loop)
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
    state.items[arr[idx]].loaded = true
  }
}
function onErrorImage(key)
{
  if (state.items[key]) state.items[key].error = true
}

function onPointerStart(e)
{
  e.stopPropagation()
  if (e.touches) pointer.touched = true
  if (e.touches && e.touches.length > 1) e.preventDefault()
  if (globalState.playedSlide) return
  if (!preference.slides.swipe) return
  if (preference.slides.transitionType !== TRANSITION_TYPE.HORIZONTAL) return
  if (slides.order.length <= 2) return
  pointer.dist = 0
  pointer.startX = (e.touches && e.touches[0]) ? Math.floor(e.touches[0].clientX) : (e.clientX || e.pageX)
  pointer.startTime = new Date().getTime()
  globalState.swipe = true
}
function onPointerMove(e)
{
  e.stopPropagation()
  if (!e.touches && pointer.touched) return
  if (!globalState.swipe) return
  if (slides.order.length <= 2) return
  pointer.moveX = (e.touches && e.touches[0]) ? Math.floor(e.touches[0].clientX) : (e.clientX || e.pageX)
  const containerWidth = $root.value.offsetWidth
  const dist = pointer.moveX - pointer.startX
  state.swipePosX = (dist / containerWidth * 100) + (0 - (100 * (getSlideIndex(state.active) + 1)))
}
function onPointerEnd(e)
{
  e.stopPropagation()
  if (!e.touches && pointer.touched) return
  if (!globalState.swipe) return
  if (e.touches && e.touches.length > 0) return
  if (slides.order.length <= 2) return

  const containerWidth = $root.value.offsetWidth
  pointer.endX = (e.changedTouches && e.changedTouches[0]) ? Math.floor(e.changedTouches[0].clientX) : (e.clientX || e.pageX)
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
    // TODO: 클릭하는 수준으로 짧은터치
    // TODO: HUD를 보이거나 안보이거나 토글링한다.
    return
  }

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
function onMouseLeave(e)
{
  // TODO: 예감이 이 부분은 부모 영역에서 사용해야 할거 같아 보인다. 아니면 provide 사용이 필요할지도 모르겠다.
  // TODO: 이 부분은 다른곳에서 조정해야 할 필요가 있어보인다. 다른 컨트롤 버튼이랑 좀 연관이 생길거 같다.
  if (globalState.swipe) cancelRunning()
  globalState.swipe = false
  state.swipePosX = NaN
  // TODO: 오토플레이랑 관련된 부분도 있다.
}
function onMouseEnter(e)
{
  // TODO: 여기도 부모 영역에서 실행해야할 거 같아 보인다.
  // TODO: 오토플레이에 관련된 이벤트로 사용된다.
}
function onContextMenu(e)
{
  globalState.swipe = false
  state.swipePosX = NaN
}
</script>

<style src="./images.scss" lang="scss" scoped></style>
