<template>
<nav :class="[
  'form form-radio',
  inline && 'form-radio--inline',
  type === 'button' && 'form-radio--button',
]">
  <div class="form-radio__wrap">
    <div
      v-if="type === 'button'"
      v-for="(o,k) in items"
      class="form-radio__button">
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

<script setup>
import { getValueFromType } from '~/libs/util';

const name = 'FormRadio';
const props = defineProps({
  type: String, // undefined,button
  items: { type: Array, required: true },
  name: String,
  id: String,
  inline: Boolean,
  modelType: String,
  modelValue: [ String, Number, Boolean ],
});
const emits = defineEmits([ 'update:modelValue', 'blur:modelValue' ]);

function onChange(e)
{
  emits('update:modelValue', getValueFromType(props.modelType, e.target.value));
}
function onClickItem(key)
{
  emits('update:modelValue', getValueFromType(props.modelType, key));
}
</script>

<style src="./Radio.scss" lang="scss" scoped></style>
