<template>
<article class="slideshow-slides">
  <Images
    :items="state.computedImages"
    :active="$store.state.slides.active"
    :duration="500"
    :style-type="null"
    class="slideshow-slides__images"
    @animation-end="onAnimationEnd"/>
  <Caption
    title="조용한 아침"
    :description="`first line\nsecond line`"
    class="slideshow-slides__caption"/>
  <Controller
    class="slideshow-slides__controller"
    :disabled="state.animated"
    :show-prev="true"
    :show-next="true"
    @click-prev="onClickPrev"
    @click-next="onClickNext"/>
  <Paginate
    :total="state.computedImages.length"
    :current="$store.state.slides.active"
    class="slideshow-slides__paginate"/>
</article>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import Images from './Images';
import Caption from './Caption.vue';
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
        return $store.state.slides.index.map(item => {
          return item;
        });
      }),
      animated: false,
    });

    // methods
    function changeSlide(n: number): void
    {
      if (state.animated) return;
      state.animated = true;
      $store.commit('changeSlideActive', n);
    }
    function onClickPrev(): void
    {
      changeSlide($store.state.slides.active - 1);
    }
    function onClickNext(): void
    {
      changeSlide($store.state.slides.active + 1);
    }
    function onAnimationEnd(): void
    {
      // TODO
      state.animated = false;
    }

    return {
      state,
      onClickPrev,
      onClickNext,
      onAnimationEnd,
    };
  }
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
  &__controller {
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
    &__controller {
      display: block;
      position: fixed;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &__paginate {
      right: 30px;
      bottom: 30px;
    }
  }
}
</style>
