import { ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneObject, deepMerge } from '../libs/util.js'
import { checkPreference, checkSlides } from '../libs/data.js'
import { defaultPreference, defaultSlides } from '../libs/defaults.js'

/**
 * preference store
 */
export const preferenceStore = defineStore('preference', () => {
  const general = ref(undefined)
  const slides = ref(undefined)
  const style = ref(undefined)
  const keyboard = ref(undefined)

  function setup(src)
  {
    const clonedPreference = cloneObject(defaultPreference)
    const preference = deepMerge(clonedPreference, src)
    checkPreference(preference)
    general.value = preference.general
    slides.value = preference.slides
    style.value = preference.style
    keyboard.value = preference.keyboard
  }
  function destroy()
  {
    general.value = undefined
    slides.value = undefined
    style.value = undefined
    keyboard.value = undefined
  }
  function exportData()
  {
    return cloneObject({
      general: general.value,
      slides: slides.value,
      style: style.value,
      keyboard: keyboard.value,
    })
  }

  return {
    general,
    slides,
    style,
    keyboard,
    setup,
    destroy,
    exportData,
  }
})

/**
 * slides store
 */
export const slidesStore = defineStore('slides', () => {
  const data = ref([])

  function setup(src)
  {
    const slides = cloneObject((src?.length > 0) ? src : defaultSlides)
    checkSlides(slides)
    data.value = slides
  }
  function destroy()
  {
    data.value = undefined
  }
  function exportData()
  {
    return cloneObject(data.value)
  }

  return {
    data,
    setup,
    destroy,
    exportData,
  }
})
