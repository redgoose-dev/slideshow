<template>
<label class="form-checkbox">
  <span class="form-checkbox__body">
    <input
      type="checkbox"
      :name="name"
      :id="id"
      :required="required"
      :disabled="disabled"
      :checked="modelValue"
      @change="$emit('update:modelValue', Boolean($event.target.checked))">
    <i>
      <Icon icon-name="check"/>
    </i>
  </span>
  <em v-if="label" class="form-checkbox__label">
    {{label}}
  </em>
</label>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'FormCheckbox',
  components: {
    Icon,
  },
  props: {
    name: { type: String, required: true },
    id: String,
    disabled: Boolean,
    required: Boolean,
    label: String,
    modelValue: Boolean,
  },
  emits: {
    'update:modelValue': null,
    'blur:modelValue': null,
  },
});
</script>

<style lang="scss" scoped>
.form-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  &__body {
    position: relative;
    display: block;
    input {
      display: block;
      width: 100%;
      height: 100%;
      appearance: none;
      pointer-events: none;
      box-sizing: border-box;
    }
    i {
      display: block;
      width: 26px;
      height: 26px;
      box-sizing: border-box;
      border-radius: 50%;
      background-color: var(--color-shape);
      box-shadow: inset 0 0 8px 0 rgba(0,0,0,.1);
      overflow: hidden;
      transition: background-color 200ms ease-out;
      svg {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-45%, -45%) scale(0);
        transform-origin: 50% 50%;
        --icon-size: 16px;
        --icon-color: #fff;
        --icon-stroke: 3;
        transition: transform 200ms ease-out;
      }
    }
    input:checked + i {
      background-color: var(--color-key);
      svg {
        transform: translate(-45%, -45%) scale(1);
      }
    }
  }
  &__label {
    display: block;
    margin: 0 0 0 6px;
    font-size: 15px;
    font-style: normal;
    line-height: 1.15;
    font-weight: 500;
    color: var(--color-low-fill);
    letter-spacing: -.25px;
  }
}
</style>
