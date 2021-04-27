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
import { defineComponent, reactive, computed, ref } from 'vue';
import { useStore } from 'vuex';
import * as number from '~/libs/number';
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
    let swipeMeta = null;

    // check active number
    if (!checkActive(state.active)) state.active = 0;

    // methods
    function change(n)
    {
      if (state.animated) return;
      if (!checkActive(n)) return;
      const vm = images.value;
      onChangeActive(n);
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
    function onAnimationControl(sw)
    {
      state.animated = sw;
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
      if (state.animated) return;
      if (store.state.preference.slides.animationType !== 'horizontal') return;
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
        else images.value.cancel();
      }
      else
      {
        // short touch
        if (percent > 10) action(dir);
        else images.value.cancel();
      }
    }
    function onTouchCancel(e)
    {
      e.stopPropagation();
      if (state.swipeMove) images.value.cancel();
      state.swipePos = undefined;
      state.swipeMove = false;
    }
    function onContextMenu()
    {
      state.swipePos = undefined;
      state.swipeMove = false;
    }

    return {
      state,
      images,
      prev,
      next,
      onAnimationControl,
      onChangeActive,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel,
      onContextMenu,
    };
  },
});
</script>

<style src="./index.scss" lang="scss"></style>
