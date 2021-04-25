<template>
<article class="slideshow-slides">
  <Images
    ref="images"
    :initial-active="state.active"
    :items="state.computedImages"
    :animation-type="`horizontal`"
    :duration="500"
    :style-type="`contain`"
    image-size="75%"
    :loop="$store.state.preference.slides.loop"
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
      active: 6,
      animated: false,
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
      let n = number.move(state.computedImages.length, state.active - 1, store.state.preference.slides.loop);
      change(n);
    }
    function next()
    {
      let n = number.move(state.computedImages.length, state.active + 1, store.state.preference.slides.loop);
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

    return {
      state,
      images,
      prev,
      next,
      onAnimationControl,
      onChangeActive,
    };
  },
});
</script>

<style lang="scss">
@import "../../scss/mixins";
.slideshow-slides {
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
