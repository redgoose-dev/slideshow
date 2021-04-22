<template>
<nav class="slideshow-controller">
  <button type="button">
    <Icon icon-name="arrow-left"/>
  </button>
  <button type="button">
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
});
</script>

<style lang="scss">
.slideshow-controller {
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
    &:disabled {
      cursor: not-allowed;
    }
    &:active {
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
