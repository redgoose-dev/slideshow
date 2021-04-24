<template>
<article class="slideshow-slides">
  <Images
    :items="state.computedImages"
    :active="$store.state.activeSlide"
    :animation-type="`horizontal`"
    :duration="500"
    :style-type="`contain`"
    image-size="75%"
    class="slideshow-slides__images"
    @animation-control="onAnimationControl"/>
  <Caption
    title="조용한 아침"
    :description="`first line\nsecond line`"
    class="slideshow-slides__caption"/>
  <Controller
    class="slideshow-slides__controller"
    :disabled="$store.state.animatedSlides"
    :show-prev="state.computedShowPrevButton"
    :show-next="state.computedShowNextButton"
    @click-prev="onClickPrev"
    @click-next="onClickNext"/>
  <Paginate
    :total="state.computedImages.length"
    :current="$store.state.activeSlide"
    class="slideshow-slides__paginate"/>
</article>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { useStore } from 'vuex';
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
    const $store = useStore();
    let state = reactive({
      computedImages: computed(() => {
        return $store.state.slides.map(item => (item));
      }),
      computedShowPrevButton: computed(() => {
        if ($store.state.preference.slides.loop) return true;
        return 0 < $store.state.activeSlide;
      }),
      computedShowNextButton: computed(() => {
        if ($store.state.preference.slides.loop) return true;
        return $store.state.slides.length - 1 > $store.state.activeSlide;
      }),
    });

    // methods
    function changeSlide(n)
    {
      $store.commit('changeSlide', n);
    }
    function onClickPrev()
    {
      changeSlide($store.state.activeSlide - 1);
    }
    function onClickNext()
    {
      changeSlide($store.state.activeSlide + 1);
    }
    function onAnimationControl(sw)
    {
      $store.commit('animationControlSlides', sw);
    }

    return {
      state,
      onClickPrev,
      onClickNext,
      onAnimationControl,
    };
  },
});
</script>

<style lang="scss">
@import "../../scss/mixins";
.slideshow-slides {
  &__images {
    z-index: 0;
  }
  &__caption {
    display: none;
  }
  &__paginate {
    position: fixed;
    z-index: 2;
    right: 16px;
    bottom: 10px;
  }
  @include responsive(desktop) {
    &__caption {
      display: block;
      position: fixed;
      top: 32px;
      left: 30px;
      z-index: 2;
    }
    &__paginate {
      right: 30px;
      bottom: 30px;
    }
  }
}
</style>
