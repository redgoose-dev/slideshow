<template>
<div v-if="!state.stop" class="slideshow">
  <Error v-if="state.error"/>
  <Slides v-else>
    <slot/>
  </Slides>
  <component v-if="debug" :is="debug"/>
</div>
</template>

<script setup>
import { reactive, watch, onMounted, onUnmounted, nextTick, defineAsyncComponent } from 'vue'
import { preferenceStore, slidesStore, globalStateStore } from './store/index.js'
import Slides from './components/slides/index.vue'
import Error from './components/error/index.vue'

const preference = preferenceStore()
const slides = slidesStore()
const globalState = globalStateStore()
const props = defineProps({
  active: [ String, Number ],
  autoplay: Boolean,
  preference: Object,
  slides: Array,
})
const state = reactive({
  stop: true,
  error: undefined,
  swipe: false,
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

// TODO: 무작위로 섞는 기능은 슬라이드쇼 내부에서 정할지 외부에서 섞고 슬라이드쇼에다 집어넣기만 할지 고민하기

// lifecycles
onMounted(() => {
  start().then()
})
onUnmounted(() => {
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
watch(() => slides.active, (value) => {
  emits('update:active', value)
})
watch(() => props.autoplay, (value) => {
  globalState.autoplay = value
})

async function start()
{
  if (!state.stop) return
  try
  {
    preference.setup(props.preference)
    slides.setup(props.slides, String(props.active))
    globalState.setup({
      autoplay: props.autoplay,
    })
    await nextTick()
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
  state.stop = true
  state.error = undefined
}
async function restart()
{
  await stop()
  await nextTick()
  await start()
}
function exportData()
{
  // TODO: 데이터 내보내기
}

// set expose
defineExpose({
  stop,
  start,
  restart,
  exportData,
})
</script>

<style src="./index.scss" lang="scss" scoped></style>
