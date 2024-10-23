<template>
<article class="docs">
  <Slideshow
    ref="$slideshow"
    v-model:active="slideshowState.active"
    v-model:autoplay="slideshowState.autoplay"
    :preference="preference"
    :slides="slides"
    :language="language"
    :theme="slideshowState.theme"
    class="slideshow">
    <Navigation
      class="navigation"/>
  </Slideshow>
</article>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getStorage, setStorage, STORAGE_KEYS } from './libs/storage.js'
import { cloneObject } from '../slideshow/libs/util.js'
import { defaultLanguage, defaultPreference } from '../slideshow/libs/defaults.js'
import defaultSlides from './assets/default-slides.json'
import { slideshowStateStore } from './stores.js'
import Slideshow from '../slideshow/index.vue'
import Navigation from './components/navigation.vue'

const $slideshow = ref()
const slideshowState = slideshowStateStore()
const preference = ref({})
const slides = ref([])
const language = ref({})

// setup data
setupPreference()
setupSlides()
setupLanguage()
setupStates()

// lifecycles
onMounted(() => {
})
onBeforeUnmount(() => {})

// subscribe store
slideshowState.$subscribe((mutation, state) => {
  setStorage(STORAGE_KEYS.STATES, {
    active: slideshowState.active,
    autoplay: slideshowState.autoplay,
    theme: slideshowState.theme,
  })
})

function setupPreference()
{
  const storageData = getStorage(STORAGE_KEYS.PREFERENCE)
  if (storageData)
  {
    preference.value = storageData
  }
  else
  {
    let _preference = cloneObject(defaultPreference)
    _preference.slides.captionAnimationType = 'shuffle'
    _preference.keyboard.eventTarget = 'window'
    _preference.slides.autoplay = true
    setStorage(STORAGE_KEYS.PREFERENCE, _preference)
    preference.value = _preference
  }
}
function setupSlides()
{
  const storageData = getStorage(STORAGE_KEYS.SLIDES)
  if (storageData)
  {
    slides.value = storageData
  }
  else
  {
    const _slides = cloneObject(defaultSlides)
    setStorage(STORAGE_KEYS.SLIDES, _slides)
    slides.value = _slides
  }
}
function setupLanguage()
{
  const storageData = getStorage(STORAGE_KEYS.LANGUAGE)
  if (storageData)
  {
    language.value = storageData
  }
  else
  {
    const _language = cloneObject(defaultLanguage)
    setStorage(STORAGE_KEYS.LANGUAGE, _language)
    language.value = _language
  }
}
function setupStates()
{
  const storageData = getStorage(STORAGE_KEYS.STATES)
  if (storageData)
  {
    slideshowState.active = storageData.active
    slideshowState.autoplay = storageData.autoplay
    slideshowState.theme = storageData.theme
  }
}

</script>

<style src="./app.scss" lang="scss" scoped></style>
