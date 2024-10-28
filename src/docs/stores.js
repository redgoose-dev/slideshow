import { defineStore } from 'pinia'
import { setStorage, STORAGE_KEYS } from './libs/storage.js'
import { cloneObject } from '../slideshow/libs/util.js'

export const stateStore = defineStore('state-store', {
  state: () => {
    return {
      active: '',
      autoplay: false,
      theme: 'light',
    }
  },
  actions: {
    changeTheme(value)
    {
      const $html = document.documentElement
      $html.dataset.theme = value
      this.theme = value || 'light'
    },
  },
})

export const preferenceStore = defineStore('preference-store', {
  state: () => {
    return {
      data: {},
    }
  },
  actions: {
    update(newData)
    {
      newData = cloneObject(newData)
      setStorage(STORAGE_KEYS.PREFERENCE, newData)
      this.data = newData
    },
  },
})

export const slidesStore = defineStore('slides-store', {
  state: () => {
    return {
      data: {},
    }
  },
  actions: {
    update(newData)
    {
      newData = cloneObject(newData)
      setStorage(STORAGE_KEYS.SLIDES, newData)
      this.data = newData
    },
  },
})

export const languageStore = defineStore('language-store', {
  state: () => {
    return {
      data: {},
    }
  },
  actions: {
    update(newData)
    {
      newData = cloneObject(newData)
      setStorage(STORAGE_KEYS.LANGUAGE, newData)
      this.data = newData
    },
  },
})
