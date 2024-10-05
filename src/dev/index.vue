<template>
<article class="dev">
  <nav>
    {{activeSlide}}
    <button @click="onClickControl('stop')">STOP</button>
    <button @click="onClickControl('start')">START</button>
    <button @click="onClickControl('restart')">RESTART</button>
    <button @click="onClickChangeSlide">GO SLIDE</button>
  </nav>
  <Slideshow
    ref="$slideshow"
    v-model:active="activeSlide"
    :preference="preference"
    :slides="slides"/>
</article>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Slideshow from '../slideshow/index.vue'
import { defaultSlides } from '../slideshow/libs/defaults.js'
import { cloneObject } from '../slideshow/libs/util.js'

const $slideshow = ref()
const preference = ref({
  general: {
    FOO: 'barrrr',
    language: 'ko',
  },
  slides: {
    loop: true,
    transitionType: 'horizontal', // none,fade,horizontal
    transitionSpeed: 600,
    captionAnimationType: 'shuffle', // none,shuffle
    captionAnimationSpeed: 40,
    captionAnimationDelay: 500,
    swipe: true,
    autoplay: false,
    autoplayDelay: 7000,
    autoplayDirection: true, // next(true), prev(false)
    autoplayPauseOnHover: false,
  },
  style: {
    imageType: 'cover',
    imageScale: [ '100%','100%' ],
  },
})
const slides = ref(cloneObject(defaultSlides))
const activeSlide = ref('4')

async function onClickControl(mode)
{
  switch (mode)
  {
    case 'start':
      $slideshow.value.start()
      break
    case 'stop':
      $slideshow.value.stop()
      break
    case 'restart':
      $slideshow.value.restart()
      break
  }
}
function onClickChangeSlide()
{
  activeSlide.value = prompt('슬라이드 번호??')
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
