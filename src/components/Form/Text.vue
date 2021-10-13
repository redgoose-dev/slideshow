<template>
<textarea
  v-if="props.type === 'textarea'"
  ref="root"
  :type="props.type"
  :name="props.name"
  :id="props.id"
  :value="props.modelValue"
  :placeholder="props.placeholder"
  :required="props.required"
  :min="props.min"
  :max="props.max"
  :step="props.step"
  :maxlength="props.maxlength"
  :rows="props.rows"
  :size="props.size"
  :class="[
    'form',
    'form-text',
    props.inline && 'form-text--inline',
    props.color && `form-text--color-${props.color}`,
  ]"
  @input="onChange"
  @blur="$emit('blur:modelValue', $event.target.value)"/>
<input
  v-else
  ref="root"
  :type="props.type"
  :name="props.name"
  :id="props.id"
  :value="props.modelValue"
  :placeholder="props.placeholder"
  :required="props.required"
  :min="props.min"
  :max="props.max"
  :step="props.step"
  :maxlength="props.maxlength"
  :size="props.size"
  :class="[
    'form',
    'form-text',
    props.inline && 'form-text--inline',
    props.color && `form-text--color-${props.color}`,
  ]"
  @input="onChange"
  @blur="$emit('blur:modelValue', $event.target.value)"/>
</template>

<script setup>
import { ref } from 'vue';
import * as util from '~/libs/util';

const name = 'FormText';
const props = defineProps({
  type: { type: String, default: 'text' }, // text,tel
  name: String,
  id: String,
  placeholder: String,
  required: Boolean,
  min: Number,
  max: Number,
  step: Number,
  maxlength: Number,
  inline: Boolean,
  rows: { type: Number, default: 3 },
  size: { type: Number, default: 10 },
  color: String, // error,success
  modelType: String,
  modelValue: [ String, Number, Boolean, Array ],
});
const emits = defineEmits([ 'update:modelValue', 'blur:modelValue' ]);
const root = ref(0);

function onChange(e)
{
  emits('update:modelValue', util.getValueFromType(props.modelType, e.target.value));
}
function focus()
{
  if (root.value) root.value.focus();
}

// set expose
defineExpose({
  focus,
});
</script>

<style src="./Text.scss" lang="scss" scoped></style>
