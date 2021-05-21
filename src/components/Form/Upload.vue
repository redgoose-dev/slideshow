<template>
<label
  :class="[
    'form',
    'form-upload',
    disabled && 'form-upload--disabled',
  ]">
  <input
    ref="input"
    type="file"
    class="form-upload__input"
    :accept="accept"
    :disabled="disabled"
    @change="onChange">
  <span class="form-upload__body">
    <Icon icon-name="file"/>
    <em>
      {{state.filename || label}}
    </em>
    <i>
      <Icon icon-name="upload"/>
    </i>
  </span>
</label>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'FormUpload',
  components: {
    Icon,
  },
  props: {
    name: String,
    id: String,
    label: { type: String, default: 'Please upload file' },
    disabled: Boolean,
    accept: String,
  },
  setup(props, context)
  {
    let state = reactive({
      filename: '',
    });
    const input = ref(null);

    // methods
    function onChange(e)
    {
      if (!(e.target.files && e.target.files[0])) return;
      state.filename = e.target.files[0].name;
      context.emit('change', e.target.files);
    }
    function focus()
    {
      input.value.focus();
    }

    return {
      state,
      input,
      onChange,
      focus,
    };
  },
  emits: {
    'change': null,
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
<style src="./Upload.scss" lang="scss" scoped></style>
