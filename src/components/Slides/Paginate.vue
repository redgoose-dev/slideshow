<template>
<em class="slideshow-paginate">{{current + 1}} / {{total}}</em>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SlidePaginate',
  props: {
    total: { type: Number, default: 0 },
    current: { type: Number, default: 0 },
  },
});
</script>

<style lang="scss">
.slideshow-paginate {
  font-family: var(--font-eng);
  font-style: normal;
  font-size: 13px;
  user-select: none;
  line-height: 1.15;
  letter-spacing: -.5px;
}
</style>
