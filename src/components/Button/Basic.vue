<template>
<button
  :type="type"
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

<script setup>
const name = 'ButtonBasic';
const props = defineProps({
  type: { type: String, default: 'button' }, // button,reset,submit
  title: String,
  color: String, // key
  disabled: Boolean,
});
const emits = defineEmits({ 'click': null });
</script>

<style src="./Basic.scss" lang="scss" scoped></style>
