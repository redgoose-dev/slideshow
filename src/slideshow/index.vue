<template>
<div class="slideshow">
  <Loading v-if="state.loading"/>
  <Error v-else-if="state.error"/>
  <Container v-else/>
  <pre>{{preference.$state}}</pre>
</div>
</template>

<script setup>
import { reactive, watch, onMounted, onUnmounted, nextTick, provide } from 'vue'
import { preferenceStore, slidesStore } from './store/index.js'
import { sleep } from './libs/util.js'
import Container from './components/container/index.vue'
import Loading from './components/loading/main.vue'
import Error from './components/error/index.vue'

const preference = preferenceStore()
const slides = slidesStore()
const props = defineProps({
  preference: Object,
  slides: Array,
})
const state = reactive({
  loading: true,
  error: undefined,
})
const emits = defineEmits([
  'update-preference',
  'update-slides',
])

// set provides
provide('preference', { updatePreference })
provide('slides', { updateSlides })

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
watch(() => props.preference, newValue => {
  preference.setup(newValue)
}, { deep: true })
watch(() => props.slides, (newValue) => {
  //
}, { deep: false })

// set expose
defineExpose({
  stop,
  start,
  restart,
})


/**
 * ACTION
 */

preference.setup(props.preference, true)
updatePreference(undefined)

/**
 * FUNCTIONS
 */

async function start()
{
  slides.setup(props.slides)
  await nextTick()
  state.loading = false
}
async function stop()
{
  slides.destroy()
  await nextTick()
  state.loading = true
}
async function restart()
{
  await stop()
  await nextTick()
  await sleep(2000)
  await start()
}
function updatePreference(pref)
{
  if (pref) preference.setup(pref)
  emits('update-preference', preference.exportData())
}
// TODO: 이 함수는 용도가 아직 명확하지 않다.
function updateSlides()
{
  const data = slides.exportData()
  emits('update-slides', data)
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
