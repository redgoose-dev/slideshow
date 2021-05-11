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

<style src="./Basic.scss" lang="scss" scoped></style>
