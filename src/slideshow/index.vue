<template>
<div class="slideshow">
  <Loading v-if="state.loading"/>
  <Error v-else-if="state.error"/>
  <Container v-else/>
  <pre>{{preference.$state}}</pre>
</div>
</template>

<script setup>
import { reactive, watch, onMounted, onUnmounted, nextTick, provide, inject } from 'vue'
import { preferenceStore, slidesStore } from './store/index.js'
import { cloneObject, sleep } from './libs/util.js'
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
onMounted(async () => {
  await start()
  updatePreference(preference.$state)
  updateSlides(slides.$state.data)
})
onUnmounted(() => {
  stop().then()
})

// set expose
defineExpose({
  stop,
  start,
  restart,
})

/**
 * FUNCTIONS
 */

async function start()
{
  preference.setup(props.preference)
  slides.setup(props.slides)
  await nextTick()
  state.loading = false
}
async function stop()
{
  preference.destroy()
  slides.destroy()
  await nextTick()
  state.loading = true
}
async function restart()
{
  await stop()
  await nextTick()
  await sleep(3000)
  await start()
}
function updatePreference()
{
  const data = preference.exportData()
  emits('update-preference', data)
}
function updateSlides()
{
  const data = slides.exportData()
  emits('update-slides', data)
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
