<template>
<nav class="slideshow-controller">
  <button
    v-if="showPrev"
    type="button"
    :disabled="disabled"
    @click="$emit('click-prev')">
    <Icon icon-name="arrow-left"/>
  </button>
  <button
    v-if="showNext"
    type="button"
    :disabled="disabled"
    @click="$emit('click-next')">
    <Icon icon-name="arrow-right"/>
  </button>
</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '~/components/Icon/index.vue';

export default defineComponent({
  name: 'SlidesController',
  components: {
    Icon,
  },
  props: {
    showPrev: { type: Boolean, default: true },
    showNext: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
  },
  emits: {
    'click-prev': null,
    'click-next': null,
  },
});
</script>

<style lang="scss">
.slideshow-controller {
  height: 80px;
  button {
    display: block;
    width: 80px;
    height: 80px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: none;
    border: none;
    position: absolute;
    cursor: pointer;
    outline: none;
    border-radius: 1px;
    transition: opacity var(--speed-button-active) ease-out;
    &:nth-child(1) {
      left: 10px;
    }
    &:nth-child(2) {
      right: 10px;
    }
    &:active {
      opacity: .5;
    }
    &:disabled {
      cursor: auto;
      opacity: .5;
    }
    svg {
      --icon-size: 74px;
      --icon-stroke: .75;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
