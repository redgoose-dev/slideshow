<template>
<article class="dev">
  <nav>
    <span>{{slideshowState.active}}</span>
    <span>{{slideshowState.autoplay}}</span>
    <button @click="onClickControl('stop')">STOP</button>
    <button @click="onClickControl('start')">START</button>
    <button @click="onClickControl('restart')">RESTART</button>
    <button @click="onClickChangeSlide">GO SLIDE</button>
    <button @click="onClickToggleAutoplay">AUTOPLAY</button>
  </nav>
  <div class="slideshow-wrap">
    <Slideshow
      ref="$slideshow"
      :preference="preference"
      :slides="slides"
      v-model:active="slideshowState.active"
      v-model:autoplay="slideshowState.autoplay">
      <div class="add">.addd</div>
    </Slideshow>
  </div>
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
    autoplay: true,
    autoplayDelay: 3000,
    autoplayDirection: true, // next(true), prev(false)
    autoplayPauseOnHover: true,
  },
  style: {
    imageType: 'cover',
    imageScale: [ '100%','100%' ],
  },
})
const slides = ref(cloneObject(defaultSlides))
const slideshowState = reactive({
  active: '3',
  autoplay: true,
})

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
  slideshowState.active = prompt('슬라이드 번호??')
}
function onClickToggleAutoplay()
{
  slideshowState.autoplay = !slideshowState.autoplay
}
</script>

<style lang="scss" scoped>
.dev {
  position: relative;
  height: 100dvh;
  display: grid;
  place-content: center;
  > nav {
    position: absolute;
    left: 300px;
    top: 120px;
    z-index: 3;
    display: flex;
    gap: 0 8px;
    align-items: center;
  }
}
.slideshow-wrap {
  width: 100dvw;
  height: 100dvh;
}

.add {
  position: absolute;
  right: 30px;
  top: 30px;
  background: lime;
  width: 100px;
  height: 100px;
}
</style>
