<template>
<div v-if="!state.stop" class="slideshow">
  <Error v-if="state.error"/>
  <Container v-else/>
</div>
</template>

<script setup>
import { reactive, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { preferenceStore, slidesStore } from './store/index.js'
import Container from './components/container/index.vue'
import Error from './components/error/index.vue'

const preference = preferenceStore()
const slides = slidesStore()
const props = defineProps({
  active: String,
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
])

// TODO: 슬라이드쇼 내부에서 변경되고 외부에다 전달해줄 데이터 목록
// TODO: - 활성화된 슬라이드 키
// TODO: - 자동재생 켜져있는지에 대한 여부

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
watch(() => props.active, (value, oldValue) => {
  if (value === slides.active) return
  slides.change(value)
})
watch(() => slides.active, (value) => {
  emits('update:active', value)
})

async function start()
{
  if (!state.stop) return
  preference.setup(props.preference)
  slides.setup(props.slides, props.active)
  await nextTick()
  state.stop = false
}
async function stop()
{
  preference.destroy()
  slides.destroy()
  state.stop = true
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
