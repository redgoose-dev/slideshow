<template>
<aside class="preference-side">
  <nav>
    <button
      type="button"
      title="General"
      :disabled="mode === 'general'"
      class="preference-side__button"
      @click="$emit('click-menu', 'general')">
      <span>
        <Icon icon-name="tool"/>
        <em>General</em>
      </span>
    </button>
    <button
      type="button"
      title="Slide"
      :disabled="mode === 'slides'"
      class="preference-side__button"
      @click="$emit('click-menu', 'slides')">
      <span>
        <Icon icon-name="copy"/>
        <em>Slides</em>
      </span>
    </button>
    <button
      type="button"
      title="Style"
      :disabled="mode === 'style'"
      class="preference-side__button"
      @click="$emit('click-menu', 'style')">
      <span>
        <Icon icon-name="droplet"/>
        <em>Style</em>
      </span>
    </button>
    <button
      type="button"
      title="Data"
      :disabled="mode === 'data'"
      class="preference-side__button"
      @click="$emit('click-menu', 'data')">
      <span>
        <Icon icon-name="database"/>
        <em>Data</em>
      </span>
    </button>
    <button
      type="button"
      title="Keyboard"
      :disabled="mode === 'keyboard'"
      class="preference-side__button"
      @click="$emit('click-menu', 'keyboard')">
      <span>
        <Icon icon-name="command"/>
        <em>Keyboard</em>
      </span>
    </button>
  </nav>
</aside>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'preference-side',
  components: {
    Icon,
  },
  props: {
    mode: { type: String, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import "../../scss/mixins";

.preference-side {
  --size: 48px;
  width: var(--size);
  box-sizing: border-box;
  background-color: #909090;
  &__button {
    display: block;
    width: var(--size);
    height: var(--size);
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    border-radius: 0;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color var(--speed-button-active) ease-out;
    user-select: none;
    &:active {
      background-color: rgba(0,0,0,.2);
      cursor: default;
    }
    &:disabled {
      background-color: var(--color-key);
    }
    span {
      display: block;
    }
    svg {
      display: block;
      margin: 0 auto;
      --icon-size: 18px;
      --icon-color: var(--color-invert);
      --icon-stroke: 1.5;
    }
    em {
      display: none;
    }
  }

  @include responsive(desktop) {
    --size: 42px;
    width: 180px;
    &__button {
      width: 100%;
      span {
        display: flex;
        align-items: center;
      }
      svg {
        margin-left: 16px;
      }
      em {
        display: block;
        flex: 1;
        text-align: left;
        margin: 0 0 0 12px;
        font-weight: 400;
        color: var(--color-invert);
        font-size: 14px;
        font-style: normal;
        letter-spacing: -.25px;
      }
    }
  }
  @include dark-mode() {
    background-color: #303030;
  }
}
</style>
