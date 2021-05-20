<template>
<button
  type="button"
  class="button-icon">
  <Icon :icon-name="iconName"/>
</button>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'PreferenceDataButtonIcon',
  components: {
    Icon,
  },
  props: {
    iconName: String,
  },
});
</script>

<style lang="scss" scoped>
.button-icon {
  display: block;
  width: var(--button-size, 36px);
  height: var(--button-size, 36px);
  margin: 0;
  padding: 0;
  font-size: 0;
  border: none;
  background: var(--color-shape-button);
  cursor: pointer;
  border-radius: var(--size-shape-radius);
  box-sizing: border-box;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow var(--speed-button-active) ease-out;
  > svg {
    display: block;
    margin: 0 auto;
    --icon-color: var(--color-invert);
    --icon-stroke: 1.5;
    --icon-size: 20px;
  }
  &:active {
    box-shadow: inset 0 0 12px 0 rgba(0,0,0,.2);
  }
  &:focus {
    box-shadow: 0 0 0 2px var(--color-key), inset 0 0 8px 0 rgba(0,0,0,.2);
  }
}
</style>
