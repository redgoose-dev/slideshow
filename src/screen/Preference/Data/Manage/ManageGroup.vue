<template>
<form @submit="onSubmit">
  <fieldset>
    <legend>Edit slides group fields</legend>
    <div class="fields">
      <div class="field-basic">
        <h3 class="field-title">
          <label for="pref_key">
            그룹 키
          </label>
        </h3>
        <p class="field-description">
          슬라이드 그룹의 키값을 입력합니다.(필수요소)
        </p>
        <div class="field-basic__body">
          <FormText
            name="pref_key"
            id="pref_key"
            placeholder="Please input key"
            :inline="true"
            :required="true"
            :size="24"
            :maxlength="24"
            v-model="state.form.key"/>
        </div>
      </div>
      <div class="field-basic">
        <h3 class="field-title">
          <label for="pref_name">
            이름
          </label>
        </h3>
        <p class="field-description">
          카테고리의 이름을 설정합니다.
        </p>
        <div class="field-basic__body">
          <FormText
            name="pref_name"
            id="pref_name"
            placeholder="Please input text"
            v-model="state.form.name"/>
        </div>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_description">
          설명
        </label>
      </h3>
      <p class="field-description">
        카테고리에 대한 설명을 입력합니다.
      </p>
      <div class="field-basic__body">
        <FormText
          name="pref_description"
          id="pref_description"
          placeholder="Please input text"
          v-model="state.form.description"/>
      </div>
    </div>
    <nav class="submit-buttons">
      <div>
        <ButtonBasic
          type="submit"
          :color="state.processing ? '' : 'key'"
          :disabled="state.processing"
          :inline="true">
          적용하기
        </ButtonBasic>
      </div>
    </nav>
  </fieldset>
</form>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import FormText from '~/components/Form/Text';
import ButtonBasic from '~/components/Button/Basic';

export default defineComponent({
  name: 'ManageGroup',
  components: {
    FormText,
    ButtonBasic,
  },
  props: {
    form: Object,
  },
  setup(props, context)
  {
    let state = reactive({
      form: props.form,
    });

    // methods
    function onSubmit(e)
    {
      e.preventDefault();
      context.emit('submit', state.form);
    }

    return {
      state,
      onSubmit,
    };
  },
  emits: {
    'submit': null,
  },
});
</script>

<style src="../../fieldset.scss" lang="scss" scoped></style>
