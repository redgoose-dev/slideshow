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
    <button @click="onClickExportData">EXPORT DATA</button>
    <button @click="onClickGetSlidesKey">GET KEYS</button>
  </nav>
  <div class="slideshow-wrap">
    <Slideshow
      ref="$slideshow"
      v-model:active="slideshowState.active"
      v-model:autoplay="slideshowState.autoplay"
      :preference="preference"
      :slides="slides"
      :language="lang"
      :theme="slideshowState.theme"
      class="slideshow-body">
      <div class="add">.add-window</div>
    </Slideshow>
  </div>
</article>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Slideshow from '../slideshow/index.vue'
import { cloneObject } from '../slideshow/libs/util.js'
import slidesData from './res/slides.json'
// import slidesData from './res/numbers.json'
import lang from './res/lang.json'

const $slideshow = ref()
const preference = ref({
  general: {
    hud: true,
    visibleHudHover: false,
    visibleHudClick: true,
    hudContents: {
      caption: true,
      controller: true,
      paginate: true,
      slots: true,
    },
  },
  slides: {
    loop: true,
    transitionType: 'horizontal', // none,fade,horizontal
    transitionSpeed: 600,
    captionAnimationType: 'shuffle', // none,shuffle
    captionAnimationSpeed: 40,
    swipe: true,
    autoplay: true,
    autoplayDelay: 2000,
    autoplayDirection: true, // next(true), prev(false)
    autoplayPauseOnHover: false,
  },
  style: {
    imageType: 'scale-down',
    imageScale: [ '100%','100%' ],
  },
  keyboard: {
    eventTarget: 'element', // element,window
    enable: true,
  },
})
const slides = ref(cloneObject(slidesData))
const slideshowState = reactive({
  active: '1',
  autoplay: false,
  theme: 'light',
})

onMounted(() => {
  window.slideshow = {
    prev: () => $slideshow.value.prev(),
    next: () => $slideshow.value.next(),
    change: (key) => $slideshow.value.change(key),
  }
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
function onClickExportData()
{
  console.log('onClickExportData()', $slideshow.value.exportData())
}
function onClickGetSlidesKey()
{
  console.log('onClickGetSlidesKey()', $slideshow.value.getKeys())
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
    right: 20px;
    top: 150px;
    z-index: 3;
    display: flex;
    gap: 0 6px;
    align-items: center;
    button {
      display: block;
      margin: 0;
      padding: 0 12px;
      border: none;
      height: 28px;
      background: hsl(0 0% 35%);
      white-space: nowrap;
      font-size: 11px;
      color: hsl(0 0% 100%);
      font-weight: 500;
      cursor: pointer;
    }
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
  height: 60px;
}
.slideshow-body {
  //
}
</style>
