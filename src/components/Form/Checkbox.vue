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

<style src="./Checkbox.scss" lang="scss" scoped></style>
