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
      v-model:active="slideshowState.active"
      v-model:autoplay="slideshowState.autoplay"
      :preference="preference"
      :slides="slides"
      :lang="lang">
      <div class="add">.addd</div>
    </Slideshow>
  </div>
</article>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Slideshow from '../slideshow/index.vue'
import { cloneObject } from '../slideshow/libs/util.js'
import slidesData from './res/slides.json'
import lang from './res/lang.json'

const $slideshow = ref()
const preference = ref({
  general: {
    hud: true,
    visibleHudHover: false,
    visibleHudClick: false,
    hudContents: {
      caption: true,
      controller: true,
      paginate: true,
      slots: true,
    },
  },
  slides: {
    loop: false,
    transitionType: 'horizontal', // none,fade,horizontal
    transitionSpeed: 600,
    captionAnimationType: 'shuffle', // none,shuffle
    captionAnimationSpeed: 40,
    captionAnimationDelay: 500,
    swipe: true,
    autoplay: true,
    autoplayDelay: 7000,
    autoplayDirection: true, // next(true), prev(false)
    autoplayPauseOnHover: false,
  },
  style: {
    imageType: 'cover',
    imageScale: [ '100%','100%' ],
  },
})
const slides = ref(cloneObject(slidesData))
const slideshowState = reactive({
  active: '4',
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
