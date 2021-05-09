<template>
<label
  :class="[
    'form',
    'form-upload',
  ]">
  <input
    type="file"
    class="form-upload__input"
    :accept="accept"
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
import { defineComponent } from 'vue';
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
    accept: String,
  },
  setup()
  {
    // methods
    function onChange(e)
    {
      console.log('onChange');
    }

    return {
      onChange,
    };
  },
  emits: {
    'change': null,
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.form-upload {
  display: block;
  height: var(--form-height);
  cursor: pointer;
  box-sizing: border-box;
  background: var(--color-shape);
  border-radius: var(--form-radius);
  overflow: hidden;
  user-select: none;
  transition: box-shadow var(--speed-button-active) ease-out;
  &:active {}
  &:focus-within {
    box-shadow: 0 0 0 2px var(--color-key);
  }
  &__input {
    display: block;
    appearance: none;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    overflow: hidden;
    background: red;
    border: 1px solid #000;
    width: 100%;
  }
  &__body {
    display: flex;
    align-items: center;
    height: 100%;
    > svg {
      display: block;
      margin-left: 16px;
      --icon-size: 18px;
      --icon-stroke: 1.5;
      --icon-color: var(--color-low-fill)
    }
    > em {
      flex: 1;
      display: block;
      font-style: normal;
      font-size: 14px;
      font-weight: 500;
      padding: 0 16px 0 4px;
      line-height: 1.15;
    }
    > i {
      display: flex;
      align-items: center;
      width: var(--form-height);
      background: var(--color-key);
      height: 100%;
      > svg {
        display: block;
        margin: 0 auto;
        --icon-color: var(--color-invert);
        --icon-size: 20px;
        --icon-stroke: 1.75;
      }
    }
  }
}
</style>
