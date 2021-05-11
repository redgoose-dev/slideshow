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
<style lang="scss" scoped>
.form-text {
  display: block;
  width: 100%;
  height: var(--form-height);
  margin: 0;
  padding: 0 var(--form-side-padding);
  background: var(--color-shape);
  border: none;
  box-sizing: border-box;
  border-radius: var(--form-radius);
  outline: none;
  transition: box-shadow var(--speed-button-active) ease-out;
  font-size: 16px;
  &:focus {
    box-shadow: 0 0 0 2px var(--color-key);
  }
  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }
  &[type=textarea] {
    padding: 12px var(--form-side-padding);
    height: auto;
    border-radius: 4px;
    line-height: 1.42;
  }
  &--inline {
    width: unset;
    display: inline-block;
  }
  &--color {
    &-error {
      box-shadow: 0 0 0 2px var(--color-danger);
      &:focus {
        box-shadow: 0 0 0 2px var(--color-danger);
      }
    }
  }
}
</style>
