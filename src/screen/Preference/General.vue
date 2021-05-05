<template>
<div class="preference-general">
  <fieldset>
    <legend>General fields</legend>
    <div class="field">
      <h3 class="field__title">
        <label for="pref_name">Name</label>
      </h3>
      <div class="field__body">
        <FormText
          name="pref_name"
          id="pref_name"
          placeholder="Please input text"
          v-model="state.name"
          @blur="onBlur"/>
      </div>
    </div>
    <div class="field">
      <h3 class="field__title">
        <label for="pref_description">Description</label>
      </h3>
      <div class="field__body">
        <FormText
          type="textarea"
          name="pref_description"
          id="pref_description"
          placeholder="Please input text"
          v-model="state.description"
          @blur="onBlur"/>
        <p class="field__description">
          슬라이드를 설명하는 문구를 설정합니다.
        </p>
      </div>
    </div>
    <div class="field">
      <h3 class="field__title">
        <label for="pref_language">Language</label>
      </h3>
      <div class="field__body">
        <FormSelect
          name="pref_language"
          id="pref_language"
          placeholder="Please select item"
          v-model="state.language"
          @blur="onBlur">
          <option value="en">English</option>
          <option value="ko">Korean</option>
        </FormSelect>
      </div>
    </div>
  </fieldset>
</div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import FormText from '~/components/Form/Text';
import FormSelect from '~/components/Form/Select';

export default defineComponent({
  name: 'PreferenceGeneral',
  components: {
    FormText,
    FormSelect,
  },
  props: {
    structure: Object,
  },
  setup(props, context)
  {
    let state = reactive({
      name: props.structure.name,
      description: props.structure.description,
      language: props.structure.language,
    });

    function onUpdate()
    {
      console.log('onUpdate');
      // context.emit('update');
    }
    function onBlur(e)
    {
      console.log('onBlur');
    }

    return {
      state,
      onUpdate,
      onBlur,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.preference-general {}
</style>
