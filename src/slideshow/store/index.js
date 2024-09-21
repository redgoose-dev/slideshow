import { ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneObject, deepMerge } from '../libs/util.js'
import { checkPreference, checkSlides } from '../libs/data.js'
import { defaultPreference } from '../libs/defaults.js'
import index from "../components/slides/index.vue";

/**
 * preference store
 */
export const preferenceStore = defineStore('preference', () => {
  const general = ref(undefined)
  const slides = ref(undefined)
  const style = ref(undefined)
  const keyboard = ref(undefined)

  function setup(src, useDefault = false)
  {
    const clonedPreference = cloneObject(useDefault ? defaultPreference : exportData())
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
export const slidesStore = defineStore('slides', {
  state: () => ({
    data: new Set(),
  }),
  getters: {
    items()
    {
      return cloneObject([...this.data])
    },
    images()
    {
      let images = []
      this.data.forEach(slide => images.push({
        src: slide.src,
        alt: slide.title,
      }))
      return images
    },
  },
  actions: {
    setup(src)
    {
      ;((src?.length > 0) ? src : []).forEach((slide, index) => {
        this.data.add({ ...slide })
      })
    },
    exportData()
    {
      // TODO: order 값을 순서로 내부 객체를 배열로 변환하는것이 좋을거 같다.
      // TODO: 이것은 데이터 유지를 위한게 아니고 단순히 뽑아내는데 쓰이기 때문에 값의 구조가 변경되어도 괜찮다.
      // const navigation = navigationStore()
      return cloneObject(this.data)
    },
    destroy()
    {
      this.data.clear()
    },
  },
})
// export const slidesStore = defineStore('slides', () => {
//   const data = ref({})
//   function setup(src)
//   {
//     data.value = new Set()
//     ;((src?.length > 0) ? src : []).forEach((slide, index) => {
//       data.value.add(slide)
//     })
//   }
//   function destroy()
//   {
//     data.value.clear()
//   }
//   function exportData()
//   {
//     // TODO: order 값을 순서로 내부 객체를 배열로 변환하는것이 좋을거 같다.
//     // TODO: 이것은 데이터 유지를 위한게 아니고 단순히 뽑아내는데 쓰이기 때문에 값의 구조가 변경되어도 괜찮다.
//     // const navigation = navigationStore()
//     return cloneObject(data.value)
//   }
//   return {
//     data,
//     setup,
//     destroy,
//     exportData,
//   }
// })

export const navigationStore = defineStore('navigation', () => {
  const page = ref(0)
  const order = ref([]) // 슬라이드의 순서
  return {
    page,
    order,
  }
})
