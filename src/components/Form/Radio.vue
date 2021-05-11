<template>
<nav class="form form-radio">
  <div class="form-radio__wrap">
    <label
      v-for="(o,k) in items"
      class="">
      <input
        type="radio"
        :name="name"
        :id="k === 0 ? id : undefined"
        :value="o.key"
        :checked="modelValue === o.key || (!modelValue && k === 0)"
        @change="onChange"
        @blur="$emit('blur:modelValue', $event.target.value)">
      <em>{{o.label}}</em>
    </label>
  </div>
</nav>
</template>

<script>
import { defineComponent } from 'vue';
import * as util from '~/libs/util';

export default defineComponent({
  name: 'FormRadio',
  props: {
    items: { type: Array, required: true },
    name: String,
    id: String,
    modelType: String,
    modelValue: [ String, Number, Boolean ],
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
<style src="./Radio.scss" lang="scss" scoped></style>
