<template>
<label
  :class="[
    'form',
    'form-switch',
    disabled && 'form-switch--disabled',
  ]">
  <input
    type="checkbox"
    :name="name"
    :id="id"
    :required="required"
    :disabled="disabled"
    :checked="modelValue"
    @change="$emit('update:modelValue', Boolean($event.target.checked))"
    class="form-switch__body">
  <i class="form-switch__icon"/>
</label>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'FormSwitch',
  props: {
    name: { type: String, required: true },
    id: String,
    disabled: Boolean,
    required: Boolean,
    modelValue: Boolean,
  },
  emits: {
    'update:modelValue': null,
    'blur:modelValue': null,
  },
});
</script>

<style src="./Switch.scss" lang="scss" scoped></style>
