<template>
<article
  class="slideshow-slides"
  @touchstart="onTouchStart"
  @touchmove="onTouchMove"
  @touchend="onTouchEnd"
  @mousedown="onTouchStart"
  @mousemove="onTouchMove"
  @mouseup="onTouchEnd"
  @mouseleave="onTouchCancel"
  @contextmenu="onTouchCancel">
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
    :title="state.computedCaption.title"
    :description="state.computedCaption.description"
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
  <p class="log">{{state.swipePos}}</p>
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
    let swipeMove = false;
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
    function prev(e)
    {
      let n = number.move(
        state.computedImages.length,
        state.active - 1,
        store.state.preference.slides.loop
      );
      change(n);
    }
    function next(e)
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
    // TODO
    function onTouchStart(e)
    {
      e.stopPropagation();
      if (store.state.preference.slides.animationType !== 'horizontal') return;
      swipeMeta = {
        dist: 0,
        startX: (e.touches && e.touches[0]) ? Math.floor(e.touches[0].clientX) : (e.clientX || e.pageX),
        startTime: new Date().getTime(),
      };
      swipeMove = true;
    }
    function onTouchMove(e)
    {
      e.preventDefault();
      if (!swipeMove) return;
      const screenWidth = window.innerWidth;
      swipeMeta.moveX = (e.touches && e.touches[0]) ? Math.floor(e.touches[0].clientX) : (e.clientX || e.pageX);
      const dist = swipeMeta.moveX - swipeMeta.startX;
      state.swipePos = (dist / screenWidth * 100) + (0 - (100 * (state.active)));
    }
    function onTouchEnd(e)
    {
      e.preventDefault();
      if (!swipeMove) return;
      if (e.touches && e.touches.length > 0) return;
      swipeMeta.endX = (e.changedTouches && e.changedTouches[0]) ? Math.floor(e.changedTouches[0].clientX) : (e.clientX || e.pageX);
      let elapsedTime = new Date().getTime() - swipeMeta.startTime;
      state.swipePos = undefined;

      // short touch
      // if (elapsedTime <= 200)
      // {
      //   console.log('short touch');
      // }
      // // long touch
      // else if (elapsedTime <= 1000)
      // {
      //   console.log('long touch');
      // }

      // if (swipeMeta.startX > swipeMeta.endX)
      // {
      //   next();
      // }
      // else
      // {
      //   prev();
      // }

      // TODO: 스와이프 액션이 일어나는 조건
      // TODO: - 짧은 시간에 조금 이동하면 OK (튕기듯이 손가락을 이동했다는 의미다.)
      // TODO: - 긴 시간에 일정이상 이동하면 OK

      // TODO: 스와이프가 취소되거나 종료되었을때 제자리로 돌아가는데 애니메이션이 들어가면 좋을거 같다.

      swipeMove = false;
    }
    function onTouchCancel(e)
    {
      e.stopPropagation();
      state.swipePos = undefined;
      swipeMove = false;
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
    };
  },
});
</script>

<style src="./index.scss" lang="scss"></style>
