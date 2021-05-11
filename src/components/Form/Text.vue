<template>
<textarea
  v-if="type === 'textarea'"
  ref="root"
  :type="type"
  :name="name"
  :id="id"
  :value="modelValue"
  :placeholder="placeholder"
  :required="required"
  :min="min"
  :max="max"
  :step="step"
  :maxlength="maxlength"
  :rows="rows"
  :size="size"
  :class="[
    'form',
    'form-text',
    inline && 'form-text--inline',
    color && `form-text--color-${color}`,
  ]"
  @input="onChange"
  @blur="$emit('blur:modelValue', $event.target.value)"/>
<input
  v-else
  ref="root"
  :type="type"
  :name="name"
  :id="id"
  :value="modelValue"
  :placeholder="placeholder"
  :required="required"
  :min="min"
  :max="max"
  :step="step"
  :maxlength="maxlength"
  :size="size"
  :class="[
    'form',
    'form-text',
    inline && 'form-text--inline',
    color && `form-text--color-${color}`,
  ]"
  @input="onChange"
  @blur="$emit('blur:modelValue', $event.target.value)"/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import * as util from '~/libs/util';

export default defineComponent({
  name: 'FormText',
  props: {
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
  },
  setup(props, context)
  {
    const root = ref(0);
    function onChange(e)
    {
      context.emit('update:modelValue', util.getValueFromType(props.modelType, e.target.value));
    }
    function focus()
    {
      if (root.value) root.value.focus();
    }
    return {
      root,
      onChange,
      focus,
    };
  },
  emits: {
    'update:modelValue': null,
    'blur:modelValue': null,
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
<style src="./Text.scss" lang="scss" scoped></style>
