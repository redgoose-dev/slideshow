<template>
<div
  :class="[
    'images',
    `style--${settings.imageType}`,
    `mode--${settings.transitionType}`,
    state.useAnimationPlay && 'animation-play',
    state.useAnimationCancel && 'animation-cancel',
  ]"
  :style="rootStyles">
  <ul ref="$body" class="body">
    <li
      v-for="(item, key) in state.items"
      :ref="el => { $image[item.key] = el }"
      :class="[
        (!!state.classNameActive && state.active === item.key) && state.classNameActive,
        (!!state.classNamePrevActive && state.prevActive === item.key) && state.classNamePrevActive,
      ]">
      <!-- <p v-if="item.error">.error</p>-->
      <img
        :src="item.src"
        :alt="item.alt"/>
    </li>
  </ul>
  <i class="overlay"></i>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import { preferenceStore, slidesStore } from '../../store/index.js'
import { TRANSITION_TYPE } from '../../libs/keywords.js'
import { sleep } from '../../libs/util.js'

// TODO: 시작하거나 슬라이드 트랜지션이 끝나면 주변 슬라이드 이미지 로드하는 작업을 한다. 이번에는 주변 2개까지 불러오는 로직을 구현해보는게 좋겠다.

const preference = preferenceStore()
const slides = slidesStore()
const props = defineProps({})
const emits = defineEmits([
  'change',
])
const $image = ref({})
const $body = ref()
const state = reactive({
  items: slides.$state.order.map(key => {
    const item = slides.$state.data.get(key)
    return {
      key,
      src: item.src,
      alt: item.title,
      loaded: false,
      error: false,
    }
  }),
  classNameActive: 'active',
  classNamePrevActive: '',
  active: '',
  prevActive: '',
  useAnimationPlay: false,
  useAnimationCancel: false,
})
const settings = computed(() => {
  const { slides, style } = preference
  return {
    transitionType: slides.transitionType || TRANSITION_TYPE.NONE,
    transitionSpeed: slides.transitionSpeed || 500,
    imageType: style.imageType || 'none',
    imageScale: style.imageScale || [ '100%', '100%' ],
  }
})
const rootStyles = computed(() => {
  if (slides.order.indexOf(state.active) <= -1) return
  let style = {}
  style[`--size-width`] = settings.value.imageScale[0]
  style[`--size-height`] = settings.value.imageScale[1]
  switch (settings.value.transitionType)
  {
    case TRANSITION_TYPE.FADE:
      break
    case TRANSITION_TYPE.HORIZONTAL:
      style[`--speed-transition`] = `${settings.value.transitionSpeed}ms`
      style[`--active-column`] = getSlideIndex(state.prevActive || state.active)
      // style[`--move-x`] = `` // TODO: 드래그에 필요하다.
      break
  }
  return style
})
const showFirstSlide = computed(() => {
  return false
})
const showLastSlide = computed(() => {
  return false
})

onMounted(() => {
  const { initialKey } = preference.slides
  // set initial key
  if (initialKey && slides.order.includes(initialKey))
  {
    state.active = initialKey
  }
  else
  {
    state.active = slides.order[0]
  }
  // TODO: 주변 이미지 불러오기
})

watch(() => slides.active, async (value, oldValue) => {
  if (slides.order.length <= 1) return
  await run(value, slides.direction)
})

/**
 * ACTIONS
 */

/**
 * run slide transition
 * @param {string} key
 * @param {boolean} direction (true: next, false: prev)
 * @return {Promise<void>}
 */
async function run(key, direction = true)
{
  const idx = slides.order.indexOf(key)
  // TODO: 이미지 로드 검사하기 (현재 슬라이드 이미지 불러졌는지 검사한다.)
  // console.log('run()', idx, key, direction)
  console.log(state.active, key)
  switch (settings.value.transitionType)
  {
    case TRANSITION_TYPE.NONE:
      state.active = key
      // TODO: 주변 이미지 불러오기
      break
    case TRANSITION_TYPE.FADE:
      slides.lock = true
      state.useAnimationPlay = true
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
      state.useAnimationPlay = true
      state.active = key
      $body.value.addEventListener('transitionend', onTransitionEnd, { once: true })
      break
  }
}
function onTransitionEnd()
{
  switch (settings.value.transitionType)
  {
    case TRANSITION_TYPE.FADE:
      state.useAnimationPlay = false
      state.prevActive = ''
      state.classNamePrevActive = ''
      state.classNameActive = 'active'
      slides.lock = false
      // TODO: 주변 이미지 불러오기
      break
    case TRANSITION_TYPE.HORIZONTAL:
      slides.lock = false
      state.useAnimationPlay = false
      // TODO: 주변 이미지 불러오기
      break
  }
}

function getSlideIndex(key)
{
  const idx = slides.order.indexOf(key)
  return idx > -1 ? idx : undefined
}
</script>

<style src="./images.scss" lang="scss" scoped></style>
