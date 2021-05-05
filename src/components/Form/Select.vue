<template>
<label
  :class="[
    'form',
    'form-select',
    disabled && 'form-select--disabled',
  ]">
  <select
    :name="name"
    :id="id"
    :required="required"
    :value="modelValue"
    class="form-select__body"
    @change="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur:modelValue', $event.target.value)">
    <option v-if="placeholder" value="" :disabled="false">
      {{placeholder}}
    </option>
    <slot/>
  </select>
  <Icon
    icon-name="arrow-down"
    class="form-select__icon"/>
</label>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'FormSelect',
  components: {
    Icon,
  },
  props: {
    name: { type: String, required: true },
    id: String,
    disabled: Boolean,
    required: Boolean,
    placeholder: { type: String, default: 'Please select item' },
    modelValue: [ String, Number ],
  },
  setup()
  {
    return {};
  },
  emits: {
    'update:modelValue': null,
    'blur:modelValue': null,
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.form-select {
  display: block;
  position: relative;
  height: var(--form-height);
  box-sizing: border-box;
  background: var(--color-shape);
  border-radius: var(--form-radius);
  transition: box-shadow var(--speed-button-active) ease-out;
  &:focus-within {
    box-shadow: 0 0 0 2px var(--color-key);
  }
  &__body {
    width: 100%;
    height: 100%;
    appearance: none;
    box-sizing: border-box;
    outline: none;
    background: none;
    border: none;
    padding: 0 var(--form-side-padding);
    font-size: 16px;
  }
  &__icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    --icon-stroke: 1.5;
    --icon-size: 22px;
  }
  &--disabled {
    opacity: .5;
    cursor: not-allowed;
  }
}
</style>
