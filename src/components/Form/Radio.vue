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
<style lang="scss" scoped>
@import "../../scss/mixins";

.form-radio {
  display: flex;
  justify-content: flex-start;
  user-select: none;
  &__wrap {
    display: flex;
    height: var(--form-height);
    border-radius: calc(var(--form-height) * .5);
    overflow: hidden;
    background-color: var(--color-shape);
    transition: box-shadow var(--speed-button-active) ease-out;
    &:focus-within {
      box-shadow: 0 0 0 2px var(--color-key);
    }
  }
  label {
    display: block;
    flex: 1;
    height: 100%;
    -webkit-tap-highlight-color: transparent;
    &:nth-child(n+2) {
      border-left: 1px solid var(--color-invert);
    }
  }
  input {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
  em {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    cursor: pointer;
    height: 100%;
    font-style: normal;
    font-size: 16px;
    letter-spacing: -.25px;
    transition: background-color 200ms ease-out, color 200ms ease-out;
  }
  input:checked + em {
    background-color: var(--color-key);
    color: var(--color-invert);
    cursor: default;
  }
  @include responsive(desktop) {
    em {
      padding: 0 24px;
    }
  }
}
</style>
