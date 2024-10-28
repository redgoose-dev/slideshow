<template>
<article class="docs">
  <Settings
    v-if="mode === 'settings'"
    @close="onChangeMode('')"/>
  <Slideshow
    v-else
    ref="$slideshow"
    v-model:active="slideshowState.active"
    v-model:autoplay="slideshowState.autoplay"
    :preference="preference.data"
    :slides="slides.data"
    :language="language.data"
    :theme="slideshowState.theme"
    class="slideshow">
    <Navigation
      class="navigation"
      @change-mode="onChangeMode"/>
  </Slideshow>
</article>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { getStorage, setStorage, STORAGE_KEYS } from './libs/storage.js'
import { cloneObject } from '../slideshow/libs/util.js'
import { defaultLanguage, defaultPreference } from '../slideshow/libs/defaults.js'
import defaultSlides from './assets/default-slides.json'
import { stateStore, preferenceStore, slidesStore, languageStore } from './stores.js'
import Slideshow from '../slideshow/index.vue'
import Navigation from './components/navigation.vue'
import Settings from './components/settings/index.vue'

const $slideshow = ref()
const slideshowState = stateStore()
const preference = preferenceStore()
const slides = slidesStore()
const language = languageStore()
const mode = ref('')

// setup data
setupPreference()
setupSlides()
setupLanguage()
setupStates()

// lifecycles
onMounted(() => {
  updateRootClass(!mode.value)
})
onBeforeUnmount(() => {})

// watch
watch(() => slideshowState.theme, slideshowState.changeTheme)

// subscribe store
slideshowState.$subscribe(() => {
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
    preference.data = storageData
  }
  else
  {
    let _preference = cloneObject(defaultPreference)
    _preference.slides.captionAnimationType = 'shuffle'
    _preference.keyboard.eventTarget = 'window'
    _preference.slides.autoplay = true
    setStorage(STORAGE_KEYS.PREFERENCE, _preference)
    preference.data = _preference
  }
}
function setupSlides()
{
  const storageData = getStorage(STORAGE_KEYS.SLIDES)
  if (storageData)
  {
    slides.data = storageData
  }
  else
  {
    const _slides = cloneObject(defaultSlides)
    setStorage(STORAGE_KEYS.SLIDES, _slides)
    slides.data = _slides
  }
}
function setupLanguage()
{
  const storageData = getStorage(STORAGE_KEYS.LANGUAGE)
  if (storageData)
  {
    language.data = storageData
  }
  else
  {
    const _language = cloneObject(defaultLanguage)
    setStorage(STORAGE_KEYS.LANGUAGE, _language)
    language.data = _language
  }
}
function setupStates()
{
  const storageData = getStorage(STORAGE_KEYS.STATES)
  if (storageData)
  {
    slideshowState.$patch({
      active: storageData.active,
      autoplay: storageData.autoplay,
    })
    slideshowState.changeTheme(storageData.theme || 'light')
  }
}

async function onChangeMode(newMode)
{
  if (!mode.value && newMode)
  {
    $slideshow.value.stop()
    updateRootClass(false)
  }
  else
  {
    updateRootClass(true)
  }
  await nextTick()
  mode.value = newMode
}
function updateRootClass(sw)
{
  const $html = document.documentElement
  if (sw) $html.classList.add('slideshow-mode')
  else $html.classList.remove('slideshow-mode')
}
</script>

<style src="./app.scss" lang="scss" scoped></style>
