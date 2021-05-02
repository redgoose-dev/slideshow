<template>
<article
  :class="[
    'slideshow-slides',
    state.swipeMove && 'swipe-move',
  ]"
  @touchstart="onTouchStart"
  @touchmove="onTouchMove"
  @touchend="onTouchEnd"
  @mousedown="onTouchStart"
  @mousemove="onTouchMove"
  @mouseup="onTouchEnd"
  @mouseleave="onTouchCancel"
  @mouseenter="onMouseEnter"
  @contextmenu="onContextMenu">
  <Images
    ref="images"
    :initial-active="state.active"
    :items="state.computedImages"
    :animation-type="$store.state.preference.slides.animationType"
    :duration="$store.state.preference.slides.animationSpeed"
    :image-type="$store.state.preference.style.imageType"
    :image-size="$store.state.preference.style.imageScale"
    :loop="$store.state.preference.slides.loop"
    :move-pos="state.swipePos"
    @animation-control="onAnimationControl"
    @change-active="onChangeActive"/>
  <Caption
    :active="state.active"
    :type="$store.state.preference.slides.animationCaptionType"
    :title="state.computedCaption.title"
    :description="state.computedCaption.description"
    :animation-type="$store.state.preference.slides.animationCaptionType"
    class="slideshow-slides__caption"/>
  <Controller
    class="slideshow-slides__controller"
    :disabled="state.animated"
    :show-prev="state.computedShowPrevButton"
    :show-next="state.computedShowNextButton"
    @click-prev="prev"
    @click-next="next"/>
  <Paginate
    :total="state.computedImages.length"
    :current="state.active"
    class="slideshow-slides__paginate"/>
</article>
</template>

<script>
import { defineComponent, reactive, computed, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';
import * as number from '~/libs/number';
import * as util from '~/libs/util';
import Images from './Images';
import Caption from './Caption';
import Paginate from './Paginate';
import Controller from './Controller';

export default defineComponent({
  name: 'Slides',
  components: {
    Images,
    Caption,
    Paginate,
    Controller,
  },
  setup()
  {
    const store = useStore();
    const images = ref(null);
    let state = reactive({
      active: store.state.preference.slides.initialNumber,
      animated: false,
      swipePos: undefined,
      swipeMove: false,
      computedImages: computed(() => {
        return store.state.slides.map(item => (item));
      }),
      computedShowPrevButton: computed(() => {
        if (store.state.preference.slides.loop) return true;
        return 0 < state.active;
      }),
      computedShowNextButton: computed(() => {
        if (store.state.preference.slides.loop) return true;
        return state.computedImages.length - 1 > state.active;
      }),
      computedCaption: computed(() => {
        const item = state.computedImages[state.active];
        return {
          title: item.title,
          description: item.description,
        };
      }),
    });
    let swipeMeta = null; // 슬라이드를 스와이프할때 필요한 정보들을 담는다.
    let autoplayTimer = undefined; // 오토플레이 `setTimeout` 값을 담는데 사용된다.
    let autoplayPause = false; // 오토플레이 일시정지할때 사용하는 결정적인 값

    // check active number
    if (!checkActive(state.active)) state.active = 0;

    // methods
    function onAnimationControl(sw)
    {
      state.animated = sw;
      if (!sw)
      {
        // with autoplay
        let autoplay = store.state.preference.slides.autoplay && !autoplayPause;
        if (autoplay) runAutoplay(true);
      }
    }
    function onChangeActive(n)
    {
      state.active = n;
    }
    function checkActive(n)
    {
      return !!state.computedImages[n];
    }
    function onTouchStart(e)
    {
      e.preventDefault();
      if (!store.state.preference.slides.swipe) return;
      if (store.state.preference.slides.animationType !== 'horizontal') return;
      if (state.animated) return;
      runAutoplay(false);
      swipeMeta = {
        dist: 0,
        startX: (e.touches && e.touches[0]) ? Math.floor(e.touches[0].clientX) : (e.clientX || e.pageX),
        startTime: new Date().getTime(),
      };
      state.swipeMove = true;
    }
    function onTouchMove(e)
    {
      e.preventDefault();
      if (state.animated || !state.swipeMove) return;
      swipeMeta.moveX = (e.touches && e.touches[0]) ? Math.floor(e.touches[0].clientX) : (e.clientX || e.pageX);
      const screenWidth = window.innerWidth;
      const dist = swipeMeta.moveX - swipeMeta.startX;
      state.swipePos = (dist / screenWidth * 100) + (0 - (100 * (state.active)));
    }
    function onTouchEnd(e)
    {
      function action(dir)
      {
        if (dir) next();
        else prev();
      }
      function cancel()
      {
        images.value.cancel();
      }

      e.preventDefault();
      if (state.animated || !state.swipeMove) return;
      if (e.touches && e.touches.length > 0) return;

      const screenWidth = window.innerWidth;
      swipeMeta.endX = (e.changedTouches && e.changedTouches[0]) ? Math.floor(e.changedTouches[0].clientX) : (e.clientX || e.pageX);
      let dir = swipeMeta.startX > swipeMeta.endX; // next is true
      let elapsedTime = new Date().getTime() - swipeMeta.startTime;
      let distPos = swipeMeta.endX - swipeMeta.startX;
      let percent = Math.abs(distPos) / screenWidth * 100;

      // unset values
      state.swipePos = undefined;
      state.swipeMove = false;
      swipeMeta = undefined;

      // 클릭하는 수준으로 짧으면 정지
      if (elapsedTime < 100 || percent < 2) return;

      // play
      if (elapsedTime > 300)
      {
        // long touch
        if (percent > 30) action(dir);
        else cancel();
      }
      else
      {
        // short touch
        if (percent > 10) action(dir);
        else cancel();
      }
    }
    function onTouchCancel(e)
    {
      e.stopPropagation();
      if (state.swipeMove) images.value.cancel();
      state.swipePos = undefined;
      state.swipeMove = false;
      if (store.state.preference.slides.autoplay && store.state.preference.slides.autoplayPauseOnHover)
      {
        autoplayPause = false;
        if (!state.animated) runAutoplay(true);
      }
    }
    function onMouseEnter(e)
    {
      if (store.state.preference.slides.autoplay && store.state.preference.slides.autoplayPauseOnHover)
      {
        autoplayPause = true;
        runAutoplay(false);
      }
    }
    function onContextMenu()
    {
      state.swipePos = undefined;
      state.swipeMove = false;
    }
    function runAutoplay(sw)
    {
      if (!store.state.preference.slides.autoplay) return;
      if (sw && !autoplayTimer)
      {
        const delay = store.state.preference.slides.autoplayDelay;
        const dir = store.state.preference.slides.autoplayDirection;
        const loop = store.state.preference.slides.loop;
        const side = isActiveSide(dir);
        if (!loop && (!loop && side)) return;
        autoplayTimer = setTimeout(() => {
          if (!dir) prev();
          else next();
        }, delay);
      }
      else if (autoplayTimer)
      {
        clearTimeout(autoplayTimer);
        autoplayTimer = undefined;
      }
    }
    function isActiveSide(dir)
    {
      return (!dir && state.active === 0) || (dir && state.active >= state.computedImages.length - 1);
    }
    // public methods
    function change(n)
    {
      if (state.animated) return;
      if (!checkActive(n)) return;
      const vm = images.value;
      state.active = n;
      runAutoplay(false);
      vm.play(n);
    }
    function prev()
    {
      let n = number.move(
        state.computedImages.length,
        state.active - 1,
        store.state.preference.slides.loop
      );
      change(n);
    }
    function next()
    {
      let n = number.move(
        state.computedImages.length,
        state.active + 1,
        store.state.preference.slides.loop
      );
      change(n);
    }
    function autoplay(sw = undefined)
    {
      store.commit('toggleAutoplay', sw);
    }

    // lifecycles
    onMounted(() => {
      if (store.state.preference.slides.autoplay) runAutoplay(true);
    });

    // watch
    watch(() => store.state.preference.slides.autoplay, sw => runAutoplay(sw));

    return {
      state,
      images,
      // methods
      onAnimationControl,
      onChangeActive,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel,
      onMouseEnter,
      onContextMenu,
      // public methods
      change,
      prev,
      next,
      autoplay,
    };
  },
});
</script>

<style src="./index.scss" lang="scss"></style>
