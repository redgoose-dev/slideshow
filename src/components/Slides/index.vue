<template>
<article class="slideshow-slides">
  <Images
    class="slideshow-slides__images"/>
  <Caption
    title="조용한 아침"
    :description="`first line\nsecond line`"
    class="slideshow-slides__caption"/>
  <Controller
    class="slideshow-slides__controller"/>
  <Paginate
    class="slideshow-slides__paginate"/>
</article>
</template>

<script>
import { defineComponent } from 'vue';
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
});
</script>

<style lang="scss">
@import "../../scss/mixins";
.slideshow-slides {
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
  }
}
</style>
