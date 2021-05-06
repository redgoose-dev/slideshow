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

<style lang="scss" scoped>
.form-switch {
  --wrap-width: 54px;
  --wrap-padding: 4px;
  --icon-size: 28px;
  --icon-size-active: 8px;
  display: block;
  position: relative;
  width: var(--wrap-width);
  height: var(--icon-size);
  box-sizing: border-box;
  cursor: pointer;
  border-radius: calc(var(--icon-size) * .5);
  input {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    pointer-events: none;
    appearance: none;
    background: var(--color-shape);
    border-radius: calc(var(--icon-size) * .5);
    box-shadow: inset 0 0 8px 0 rgba(0,0,0,.1), inset 0 0 0 1px rgba(0,0,0,.05);
    transition: background-color 300ms ease-out, box-shadow 200ms ease-out;
    outline: none;
    &:focus {
      box-shadow: inset 0 0 8px 0 rgba(0,0,0,.1), inset 0 0 0 1px rgba(0,0,0,.05), 0 0 0 2px var(--color-key);
    }
  }
  i {
    display: block;
    position: absolute;
    left: var(--wrap-padding);
    top: var(--wrap-padding);
    width: calc(var(--icon-size) - calc(var(--wrap-padding) * 2));
    height: calc(var(--icon-size) - calc(var(--wrap-padding) * 2));
    background-color: var(--color-bg);
    border-radius: calc(var(--icon-size) * .5);
    transition: width 120ms ease-out;
    pointer-events: none;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.15);
  }
  &:active i {
    width: calc(var(--icon-size) - calc(var(--wrap-padding) * 2) + var(--icon-size-active));
  }
  input:checked {
    background-color: var(--color-key);
    & + i {
      left: unset;
      right: var(--wrap-padding);
    }
  }
  &--disabled {
    cursor: not-allowed;
    opacity: .5;
  }
}
</style>
