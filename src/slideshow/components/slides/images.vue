<template>
<div :class="[
  'images',
  `style--${settings.imageType}`,
  `mode--${settings.animationType}`,
  false && 'animation-play',
  false && 'animation-cancel',
]">
  <ul ref="$body" class="body">
    <li
      v-for="(item, key) in state.items"
      :ref="el => { $image[key] = el }"
      :class="[
      ]">
      <p v-if="item.error">.error</p>
      <img
        v-else-if="item.loaded"
        :src="item.src"
        :alt="item.alt"/>
    </li>
  </ul>
  <i class="overlay"></i>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { preferenceStore, slidesStore } from '../../store/index.js'

const preference = preferenceStore()
const slides = slidesStore()
const props = defineProps({})
const emits = defineEmits([
  'change-active',
])
const $image = ref([])
const state = reactive({
  items: slides.$state.order.map(key => {
    const item = slides.$state.data.get(key)
    return {
      src: item.src,
      alt: item.title,
      loaded: true,
      error: false,
    }
  }),
  classNameCurrent: 'current',
  classNameNext: '',
})
const settings = reactive({
  animationType: preference.$state.slides.animationType || 'none',
  imageType: preference.$state.style.imageType || 'none',
})
const showFirstSlide = computed(() => {
  return false
})
const showLastSlide = computed(() => {
  return false
})

onMounted(() => {
  //
})

watch(() => slides.$state.active, async (value) => {
  // TODO: active 코드값이 변하는것을 캐치하여 슬라이드를 변경한다.
  console.log('[images.vue] slides.$state.active', value)
})

async function play(n = undefined, mode = undefined)
{
  // TODO: 특정 모드에서는 방향이 대단히 중요해진다. 방향을 알아내려면 현재 번호와 이전 번호를 알아야 할것이다.
}
</script>

<style src="./images.scss" lang="scss" scoped></style>
