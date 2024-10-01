import { ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneObject, deepMerge } from '../libs/util.js'
import { checkPreference, checkSlides } from '../libs/data.js'
import { defaultPreference } from '../libs/defaults.js'

/**
 * preference store
 */
export const preferenceStore = defineStore('preference', {
  state: () => ({
    general: undefined,
    slides: undefined,
    style: undefined,
    keyboard: undefined,
  }),
  getters: {},
  actions: {
    setup(src, useDefault = false)
    {
      const clonedPreference = cloneObject(useDefault ? defaultPreference : this.exportData())
      const preference = deepMerge(clonedPreference, src)
      checkPreference(preference)
      this.general = preference.general
      this.slides = preference.slides
      this.style = preference.style
      this.keyboard = preference.keyboard
    },
    exportData()
    {
      return cloneObject({
        general: this.general,
        slides: this.slides,
        style: this.style,
        keyboard: this.keyboard,
      })
    },
    destroy()
    {
      this.general = undefined
      this.slides = undefined
      this.style = undefined
      this.keyboard = undefined
    },
  },
})

/**
 * slides store
 */
export const slidesStore = defineStore('slides', {
  state: () => ({
    data: new Map(),
    order: [],
    active: '',
    lock: false, // 애니메이션 중일때 값이 바뀌면 안될때가 있으니 그것을 위한 값이다.
  }),
  getters: {
    items()
    {
      return this.order.map(key => {
        return cloneObject(this.data.get(key))
      })
    },
    images()
    {
      return this.order.map(key => {
        const item = this.data.get(key)
        return {
          src: item.src,
          alt: item.title,
        }
      })
    },
  },
  actions: {
    setup(src)
    {
      const slides = (src?.length > 0) ? src : []
      slides.forEach((slide, index) => {
        const { key, ...body } = slide
        this.order.push(key)
        this.data.set(key, body)
      })
      this.active = this.order[0]
    },
    exportData()
    {
      // TODO: order 값을 순서로 내부 객체를 배열로 변환하는것이 좋을거 같다.
      // TODO: 이것은 데이터 유지를 위한게 아니고 단순히 뽑아내는데 쓰이기 때문에 값의 구조가 변경되어도 괜찮다.
      return cloneObject(this.data)
    },
    destroy()
    {
      this.data.clear()
      this.order = []
      this.active = undefined
    },
    prev()
    {
      const preference = preferenceStore()
      const activeIndex = this.order.indexOf(this.active)
      let prevIndex
      if (preference.slides.loop)
      {
        prevIndex = (activeIndex - 1 + this.order.length) % this.order.length
      }
      else
      {
        prevIndex = (activeIndex > 0) ? activeIndex - 1 : 0
      }
      this.active = this.order[prevIndex]
    },
    next()
    {
      const preference = preferenceStore()
      const activeIndex = this.order.indexOf(this.active)
      let nextIndex
      if (preference.slides.loop)
      {
        nextIndex = (activeIndex + 1) % this.order.length
      }
      else
      {
        nextIndex = (activeIndex < this.order.length - 1) ? activeIndex + 1 : this.order.length - 1
      }
      this.active = this.order[nextIndex]
    },
  },
})
