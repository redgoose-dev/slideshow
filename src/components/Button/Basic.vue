<template>
<button
  type="button"
  :disabled="disabled"
  :title="title"
  :class="[
    'button-basic',
    color && `button-basic--color-${color}`,
  ]"
  @click="$emit('click')">
  <slot/>
</button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonBasic',
  props: {
    type: String, // button,reset,submit
    title: String,
    color: String, // key
    disabled: Boolean,
  },
  emits: {
    'click': null,
  },
});
</script>

<style lang="scss" scoped>
.button-basic {
  display: block;
  width: 100%;
  height: 42px;
  margin: 0;
  padding: 0 16px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 2px;
  border: none;
  background: var(--color-shape-button);
  font-size: 16px;
  color: var(--color-invert);
  letter-spacing: -.5px;
  user-select: none;
  transition: box-shadow var(--speed-button-active) ease-out;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  &:active {
    box-shadow: inset 0 0 12px 0 rgba(0,0,0,.2);
  }
  &:focus {
    box-shadow: 0 0 0 2px var(--color-key), inset 0 0 8px 0 rgba(0,0,0,.2);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
  &--color {
    &-key {
      background: var(--color-key);
      &:active {
        box-shadow: inset 0 0 12px 0 rgba(0,0,0,.2);
      }
      &:focus {
        box-shadow:
          inset 0 0 12px 0 rgba(0,0,0,.2),
          0 0 0 2px var(--color-key),
          inset 0 0 0 1px rgba(255,255,255,.75);
      }
    }
    &-danger {
      background: var(--color-danger);
      &:active {
        box-shadow: inset 0 0 12px 0 rgba(0,0,0,.2);
      }
    }
  }
}
</style>
