<template>
<div
  ref="$slideshow"
  :tabindex="state.tabIndex"
  :class="[ 'slideshow', `theme--${props.theme}` ]">
  <Error v-if="state.error" :message="state.error.message"/>
  <Slides v-else-if="!state.stop">
    <slot/>
  </Slides>
  <component v-if="debug" :is="debug"/>
</div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onBeforeUnmount, nextTick, defineAsyncComponent } from 'vue'
import { preferenceStore, slidesStore, globalStateStore, languageStore } from './store/index.js'
import { cloneObject } from './libs/util.js'
import { KEYBOARD_EVENT_TARGET } from './libs/keywords.js'
import Slides from './components/slides/index.vue'
import Error from './components/error/index.vue'

const preference = preferenceStore()
const slides = slidesStore()
const language = languageStore()
const globalState = globalStateStore()
const $slideshow = ref()
const props = defineProps({
  active: [ String, Number ], // 활성된 슬라이드 키
  autoplay: Boolean, // 자동재생
  preference: Object, // 설정 데이터
  slides: Array, // 슬라이드 데이터
  language: Object, // 언어 데이터 객체
  theme: { type: String, default: 'system' }, // 컬러테마 (system,light,dark)
})
const state = reactive({
  stop: true,
  error: undefined,
  swipe: false,
  tabIndex: '',
})
const emits = defineEmits([
  'update:active',
  'update:autoplay',
])

// set debug component
let debug
if (import.meta.env.DEV)
{
  debug = defineAsyncComponent(() => import('./components/debug/index.vue'))
}

// lifecycles
onMounted(() => start())
onBeforeUnmount(() => {
  preference.destroy()
  slides.destroy()
  stop().then()
})

// watch
watch(() => props.slides, () => restart(), { deep: true })
watch(() => props.preference, () => restart(), { deep: true })
watch(() => String(props.active), (value, oldValue) => {
  if (value === slides.active) return
  slides.change(value)
})
watch(() => slides.active, (value) => emits('update:active', value))
watch(() => props.autoplay, (value) => {
  globalState.autoplay = value
})

async function start()
{
  if (!state.stop) return
  try
  {
    language.setup(props.language)
    preference.setup(props.preference)
    slides.setup(props.slides, String(props.active))
    globalState.setup({
      autoplay: props.autoplay,
    })
    await nextTick()
    setKeyboardEvent()
    state.stop = false
  }
  catch(e)
  {
    state.error = e
  }
}
async function stop()
{
  preference.destroy()
  slides.destroy()
  destroyKeyboardEvent()
  state.stop = true
  state.error = undefined
}
async function restart()
{
  await stop()
  await nextTick()
  await start()
}

function exports()
{
  return cloneObject({
    preference: preference.exportData(),
    slides: {
      data: slides.order.reduce((acc, cur) => {
        acc.push({
          ...slides.data.get(cur),
          key: cur,
        })
        return acc
      }, []),
      active: slides.active,
      activeIndex: slides.activeIndex,
    },
    language: Object.fromEntries(language.data),
  })
}

/**
 * KEYBOARD EVENT
 */
function setKeyboardEvent()
{
  switch (preference.keyboard.eventTarget)
  {
    case KEYBOARD_EVENT_TARGET.WINDOW:
      state.tabIndex = ''
      window.addEventListener('keyup', onKeyupEvent)
      break
    default:
      if (!$slideshow.value) return
      state.tabIndex = '0'
      $slideshow.value.addEventListener('keyup', onKeyupEvent)
      break
  }
}
function onKeyupEvent(e)
{
  if (!preference.keyboard.enable) return
  const { keyCode } = e
  switch (keyCode)
  {
    case 37: // arrow left
      slides.prev()
      break
    case 39: // arrow right
      slides.next()
      break
  }
}
function destroyKeyboardEvent()
{
  state.tabIndex = ''
  switch (preference.keyboard?.eventTarget)
  {
    case KEYBOARD_EVENT_TARGET.WINDOW:
      window.removeEventListener('keyup', onKeyupEvent)
      break
    default:
      if (!$slideshow.value) return
      $slideshow.value.removeEventListener('keyup', onKeyupEvent)
      break
  }
}

// set expose
defineExpose({
  stop,
  start,
  restart,
  exports,
})
</script>

<style src="./index.scss" lang="scss" scoped></style>
