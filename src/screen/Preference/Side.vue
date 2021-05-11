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

<style src="./Side.scss" lang="scss" scoped></style>
