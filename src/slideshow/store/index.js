import { defineStore } from 'pinia'
import { cloneObject, deepMerge } from '../libs/util.js'
import { checkPreference, checkSlides } from '../libs/data.js'
import { defaultPreference, defaultLanguage } from '../libs/defaults.js'

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
    setup(src)
    {
      let preference = deepMerge(cloneObject(defaultPreference), src)
      preference = checkPreference(preference)
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
    direction: true, // true: 정방향, false: 역방향
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
    activeIndex()
    {
      return this.order.indexOf(this.active)
    },
  },
  actions: {
    setup(src, activeKey)
    {
      const slides = (src?.length > 0) ? src : []
      checkSlides(slides)
      slides.forEach((slide, index) => {
        const { key, ...body } = slide
        const keyName = String(key || index + 1)
        this.order.push(keyName)
        this.data.set(keyName, body)
      })
      // set initial key
      if (activeKey && this.order.includes(activeKey)) this.active = activeKey
      if (!this.active) this.active = this.order[0]
    },
    destroy()
    {
      this.data.clear()
      this.order = []
    },
    prev()
    {
      if (this.lock) return
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
      this.direction = false
      this.active = this.order[prevIndex]
    },
    next()
    {
      if (this.lock) return
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
      this.direction = true
      this.active = this.order[nextIndex]
    },
    /**
     * change slide
     * @param {string} key
     */
    change(key)
    {
      if (this.lock) return
      if (!key) return
      if (key === this.active) return
      const activeIndex = this.order.indexOf(this.active)
      const nextIndex = this.order.indexOf(key)
      if (nextIndex <= -1) return
      this.direction = activeIndex < nextIndex
      this.active = this.active = this.order[nextIndex]
    }
  },
})

export const languageStore = defineStore('language', {
  state: () => ({
    data: new Map(),
  }),
  getters: {},
  actions: {
    setup(src)
    {
      const language = Object.assign({}, cloneObject(defaultLanguage), src)
      Object.entries(language).forEach(([ key, value ]) => this.data.set(key, value))
    },
    print(key)
    {
      return this.data.get(key) || undefined
    },
  },
})

/**
 * 슬라이드쇼 상태에 대한 스토어
 */
export const globalStateStore = defineStore('state', {
  state: () => ({
    swipe: false,
    playedSlide: false,
    playedSlideCancel: false,
    autoplay: true,
    hud: false,
  }),
  actions: {
    setup(op)
    {
      const preference = preferenceStore()
      if (op.autoplay !== undefined) this.autoplay = op.autoplay
      this.hud = preference.general.hud
    },
  },
})
