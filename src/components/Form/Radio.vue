<template>
<nav :class="[
  'form form-radio',
  inline && 'form-radio--inline',
  type === 'button' && 'form-radio--button',
]">
  <div class="form-radio__wrap">
    <div v-if="type === 'button'" v-for="(o,k) in items" class="form-radio__button">
      <button
        type="button"
        :disabled="modelValue === o.key || (!modelValue && k === 0)"
        @click="onClickItem(o.key)">
        {{o.label}}
      </button>
    </div>
    <label v-else v-for="(o,k) in items">
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
import { getValueFromType } from '~/libs/util';

export default defineComponent({
  name: 'FormRadio',
  props: {
    type: String, // undefined,button
    items: { type: Array, required: true },
    name: String,
    id: String,
    inline: Boolean,
    modelType: String,
    modelValue: [ String, Number, Boolean ],
  },
  setup(props, context)
  {
    function onChange(e)
    {
      context.emit('update:modelValue', getValueFromType(props.modelType, e.target.value));
    }
    function onClickItem(key)
    {
      context.emit('update:modelValue', getValueFromType(props.modelType, key));
    }
    return {
      onChange,
      onClickItem,
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
