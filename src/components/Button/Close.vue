<template>
<button
  type="button"
  :title="title"
  class="button-close"
  @click="$emit('close')">
  <Icon icon-name="x"/>
</button>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'button-close',
  components: {
    Icon,
  },
  props: {
    title: String,
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixins";

.button-close {
  --button-close-size: 48px;
  display: block;
  width: var(--button-close-size);
  height: var(--button-close-size);
  margin: 0;
  padding: 0;
  font-size: 0;
  border: none;
  background: rgba(250,250,250,.75);
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border-radius: 2px;
  -webkit-tap-highlight-color: transparent;
  transition: opacity var(--speed-button-active) ease-out;
  @supports (backdrop-filter: blur(5px)) {
    backdrop-filter: blur(5px);
  }
  &:active {
    opacity: .5;
  }
  &:focus {
    box-shadow: 0 0 0 2px var(--color-key);
  }
  .slideshow-icon {
    display: block;
    margin: 0 auto;
    --icon-color: var(--color-fill);
    --icon-size: 36px;
    --icon-stroke: 1.25px;
  }

  @include responsive(tablet) {
    --button-close-size: 58px;
    .slideshow-icon {
      --icon-size: 52px;
      --icon-stroke: .75px;
    }
  }
  @include dark-mode() {
    background: rgba(34,34,34,.75);
  }
}
</style>
