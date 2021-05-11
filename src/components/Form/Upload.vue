<template>
<label
  :class="[
    'form',
    'form-upload',
    disabled && 'form-upload--disabled',
  ]">
  <input
    v-if="state.input"
    type="file"
    class="form-upload__input"
    :accept="accept"
    :disabled="disabled"
    @change="onChange">
  <span class="form-upload__body">
    <Icon icon-name="file"/>
    <em>{{label}}</em>
    <i>
      <Icon icon-name="upload"/>
    </i>
  </span>
</label>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import * as util from '~/libs/util';
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
      input: true,
    });

    // methods
    function onChange(e)
    {
      context.emit('change', e.target.files);
      refreshInput().then();
    }

    async function refreshInput()
    {
      state.input = false;
      await util.sleep(50);
      state.input = true;
    }

    return {
      state,
      onChange,
    };
  },
  emits: {
    'change': null,
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
<style src="./Upload.scss" lang="scss" scoped>

</style>
