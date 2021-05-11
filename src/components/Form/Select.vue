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
    :disabled="disabled"
    class="form-select__body"
    @change="onChange"
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
import * as util from '~/libs/util';
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
    placeholder: {
      type: [ String, null ],
      default: null,
    },
    modelType: String,
    modelValue: [ String, Number ],
  },
  setup(props, context)
  {
    function onChange(e)
    {
      context.emit('update:modelValue', util.getValueFromType(props.modelType, e.target.value));
    }
    return {
      onChange,
    };
  },
  emits: {
    'update:modelValue': null,
    'blur:modelValue': null,
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
<style src="./Select.scss" lang="scss" scoped></style>
