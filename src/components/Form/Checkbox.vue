<template>
<label class="form-checkbox">
  <span class="form-checkbox__body">
    <input
      type="checkbox"
      :name="props.name"
      :id="props.id"
      :required="props.required"
      :disabled="props.disabled"
      :checked="props.modelValue"
      @change="$emit('update:modelValue', Boolean($event.target.checked))">
    <i>
      <Icon icon-name="check"/>
    </i>
  </span>
  <em v-if="props.label" class="form-checkbox__label">
    {{props.label}}
  </em>
</label>
</template>

<script setup>
import Icon from '~/components/Icon/index.vue';

const name = 'FormCheckbox';
const props = defineProps({
  name: { type: String, required: true },
  id: String,
  disabled: Boolean,
  required: Boolean,
  label: String,
  modelValue: Boolean,
});
const emits = defineEmits([ 'update:modelValue', 'blur:modelValue' ]);
</script>

<style src="./Checkbox.scss" lang="scss" scoped></style>
