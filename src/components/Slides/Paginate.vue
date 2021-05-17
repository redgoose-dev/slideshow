<template>
<em class="slideshow-paginate">{{current + 1}} / {{total}}</em>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SlidePaginate',
  props: {
    total: { type: Number, default: 0 },
    current: { type: Number, default: 0 },
  },
});
</script>

<style lang="scss" scoped>
.slideshow-paginate {
  font-family: var(--font-eng);
  font-style: normal;
  font-size: 13px;
  line-height: 1.15;
  letter-spacing: -.5px;

  .slideshow--hover & {
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--speed-content-toggle) ease-out;
  }
  .slideshow--hover:hover & {
    opacity: unset;
    pointer-events: unset;
  }
}
</style>
