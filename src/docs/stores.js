import { defineStore } from 'pinia'

export const slideshowStateStore = defineStore('slideshow-state', {
  state: () => {
    return {
      active: '',
      autoplay: false,
      theme: 'light',
    }
  },
})
