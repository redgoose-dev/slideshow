<template>
<nav class="controller">
  <button
    v-if="showPrev"
    type="button"
    :disabled="disabled"
    class="prev"
    @click="$emit('click-prev')">
    <Icon icon-name="arrow-left"/>
  </button>
  <button
    v-if="showNext"
    type="button"
    :disabled="disabled"
    class="next"
    @click="$emit('click-next')">
    <Icon icon-name="arrow-right"/>
  </button>
</nav>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '~/components/Icon';

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

<style lang="scss" scoped>
@import "../../scss/mixins";
.controller {
  display: none;
  @include responsive(desktop) {
    display: block;
    button {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      width: 20vw;
      max-width: 100px;
      height: 24vh;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
      border-radius: 1px;
      transition: opacity var(--speed-button-active) ease-out;
      overflow: hidden;
      &.prev {
        left: 0;
      }
      &.next {
        right: 0;
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
        --icon-color: var(--color-fill);
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      &.prev {
        svg {
          left: 0;
        }
      }
      &.next {
        svg {
          right: 0;
        }
      }
    }
  }
}
</style>
