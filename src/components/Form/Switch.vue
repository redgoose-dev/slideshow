<template>
<label
  :class="[
    'form',
    'form-switch',
    props.disabled && 'form-switch--disabled',
  ]">
  <input
    type="checkbox"
    :name="props.name"
    :id="props.id"
    :required="props.required"
    :disabled="props.disabled"
    :checked="props.modelValue"
    @change="$emit('update:modelValue', Boolean($event.target.checked))"
    class="form-switch__body">
  <i class="form-switch__icon"/>
</label>
</template>

<script setup>
const name = 'FormSwitch';
const props = defineProps({
  name: { type: String, required: true },
  id: String,
  disabled: Boolean,
  required: Boolean,
  modelValue: Boolean,
});
const emits = defineEmits([ 'update:modelValue', 'blur:modelValue' ]);
</script>

<style src="./Switch.scss" lang="scss" scoped></style>
