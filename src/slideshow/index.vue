<template>
<div class="slideshow">
  <Error
    v-if="state.error"
    :message="state.error.message"/>
  <Slides v-else-if="!state.stop">
    <slot/>
  </Slides>
  <component v-if="debug" :is="debug"/>
</div>
</template>

<script setup>
import { reactive, watch, onMounted, onUnmounted, nextTick, defineAsyncComponent } from 'vue'
import { preferenceStore, slidesStore, globalStateStore, languageStore } from './store/index.js'
import { cloneObject } from './libs/util.js'
import Slides from './components/slides/index.vue'
import Error from './components/error/index.vue'

const preference = preferenceStore()
const slides = slidesStore()
const language = languageStore()
const globalState = globalStateStore()
const props = defineProps({
  active: [ String, Number ],
  autoplay: Boolean,
  preference: Object,
  slides: Array,
  language: Object,
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
    language.setup(props.language)
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

// set expose
defineExpose({
  stop,
  start,
  restart,
  exports,
})
</script>

<style src="./index.scss" lang="scss" scoped></style>
