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
import { ref, computed, onMounted, watch } from 'vue'
import { preferenceStore, slidesStore } from '../../store/index.js'
import { CAPTION_ANIMATION_TYPE } from '../../libs/keywords.js'
import shuffle from '../../libs/shuffle.js'

const $title = ref()
const $description = ref()
const preference = preferenceStore()
const slides = slidesStore()
const styles = computed(() => {
  const { captionPosition, captionScale } = preference.style
  return {
    '--caption-left': captionPosition[0],
    '--caption-top': captionPosition[1],
    '--caption-scale': captionScale,
  }
})
const typos = computed(() => {
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
      playShuffleAnimation(0)
      break
  }
})
watch(() => slides.active, (value, oldValue) => {
  switch (animationType.value)
  {
    case CAPTION_ANIMATION_TYPE.SHUFFLE:
      playShuffleAnimation(preference.slides.captionAnimationDelay)
      break
  }
})

function playShuffleAnimation(delay)
{
  const { captionAnimationSpeed } = preference.slides
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
      shuffle($title.value, {
        text: typos.value.title,
        fps: captionAnimationSpeed,
        randomTextType: 'pattern',
      })
    }, delay)
  }
  if (typos.value.description)
  {
    interval.description = setTimeout(() => {
      clearTimeout(interval.description)
      interval.description = undefined
      shuffle($description.value, {
        text: typos.value.description,
        fps: captionAnimationSpeed,
        randomTextType: 'pattern',
      })
    }, delay + 300)
  }
}
function clear()
{
  if ($title.value.dataset.id)
  {
    cancelAnimationFrame(Number($title.value.dataset.id))
    $title.value.textContent = ''
  }
  if ($description.value.dataset.id)
  {
    cancelAnimationFrame(Number($description.value.dataset.id))
    $description.value.textContent = ''
  }
  if (interval.title) clearTimeout(interval.title)
  if (interval.description) clearTimeout(interval.description)
}
</script>

<style src="./caption.scss" lang="scss" scoped></style>
