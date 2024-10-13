<template>
<article class="caption" :style="styles">
  <template v-if="animationType === CAPTION_ANIMATION_TYPE.NONE">
    <h1 v-if="typos.title">{{typos.title}}</h1>
    <p v-if="typos.description">{{typos.description}}</p>
  </template>
  <template v-else>
    <h1 v-if="typos.title" ref="$title"></h1>
    <p v-if="typos.description" ref="$description"></p>
  </template>
</article>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { preferenceStore, slidesStore } from '../../store/index.js'
import { CAPTION_ANIMATION_TYPE } from '../../libs/keywords.js'
import shuffle from '../../libs/shuffle.js'

const $title = ref()
const $description = ref()
const preference = preferenceStore()
const slides = slidesStore()
const captionStyles = reactive({
  opacity: 1,
  speed: 0,
})
const styles = computed(() => {
  const { captionPosition, captionScale } = preference.style
  return {
    '--caption-left': captionPosition[0],
    '--caption-top': captionPosition[1],
    '--caption-scale': captionScale,
    '--caption-opacity': captionStyles.opacity,
    '--caption-speed': `${captionStyles.speed}ms`,
  }
})
const typos = computed(() => {
  if (!slides.data.get(slides.active)) return {}
  const { title, description } = slides.data.get(slides.active)
  return { title, description }
})
const animationType = computed(() => {
  return preference.slides.captionAnimationType
})
let interval = {
  title: undefined,
  description: undefined,
}

onMounted(() => {
  switch (animationType.value)
  {
    case CAPTION_ANIMATION_TYPE.SHUFFLE:
      playShuffleAnimation()
      break
  }
})
watch(() => slides.active, (value, oldValue) => {
  switch (animationType.value)
  {
    case CAPTION_ANIMATION_TYPE.SHUFFLE:
      playShuffleAnimation()
      break
  }
})

function playShuffleAnimation()
{
  const { captionAnimationSpeed } = preference.slides
  function action($el, text)
  {
    try
    {
      shuffle($el, {
        text,
        fps: captionAnimationSpeed,
        randomTextType: 'pattern',
      })
    }
    catch (e)
    {
      clear()
    }
  }
  function clear()
  {
    if ($title.value?.dataset?.id)
    {
      cancelAnimationFrame(Number($title.value.dataset.id))
    }
    if ($description.value?.dataset?.id)
    {
      cancelAnimationFrame(Number($description.value.dataset.id))
    }
    if (interval.title) clearTimeout(interval.title)
    if (interval.description) clearTimeout(interval.description)
  }
  clear()
  if ($description.value.dataset.id)
  {
    clearInterval(Number($description.value.dataset.id))
    $description.value.innerText = ''
  }
  if (typos.value.title)
  {
    interval.title = setTimeout(() => {
      clearTimeout(interval.title)
      interval.title = undefined
      action($title.value, typos.value.title)
    }, 10)
  }
  if (typos.value.description)
  {
    interval.description = setTimeout(() => {
      clearTimeout(interval.description)
      interval.description = undefined
      action($description.value, typos.value.description)
    }, 300)
  }
}
</script>

<style src="./caption.scss" lang="scss" scoped></style>
