<template>
<form @submit="onSubmit">
  <fieldset>
    <legend>Manage slides group fields</legend>
    <div class="fields">
      <div class="field-basic">
        <h3 class="field-title">
          <label for="pref_key" class="required">
            {{$t('base.groupKey')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('description.inputKeyOnGroup')}}
        </p>
        <div class="field-basic__body">
          <FormText
            name="pref_key"
            id="pref_key"
            :placeholder="$t('base.inputKey')"
            :inline="true"
            :required="true"
            :size="24"
            :maxlength="20"
            :color="state.error.key ? 'error' : ''"
            v-model="state.form.key"
            @update:modelValue="onUpdateKey"/>
        </div>
      </div>
      <div class="field-basic">
        <h3 class="field-title">
          <label for="pref_name">{{$t('base.name')}}</label>
        </h3>
        <p class="field-description">
          {{$t('description.setCategoryName')}}
        </p>
        <div class="field-basic__body">
          <FormText
            name="pref_name"
            id="pref_name"
            :placeholder="$t('base.inputText')"
            :maxlength="32"
            v-model="state.form.name"/>
        </div>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_description">
          {{$t('base.description')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('description.setCategoryDescription')}}
      </p>
      <div class="field-basic__body">
        <FormText
          name="pref_description"
          id="pref_description"
          :placeholder="$t('base.inputText')"
          :maxlength="80"
          v-model="state.form.description"/>
      </div>
    </div>
    <nav class="submit-buttons">
      <div>
        <ButtonBasic type="submit" color="key" :inline="true">
          {{form.type === 'add' ? $t('base.add') : $t('base.submitEdit')}}
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
      error: {
        key: false,
      },
    });

    // methods
    function onUpdateKey(str)
    {
      if (!str) state.error.key = true;
      state.error.key = !/^[a-zA-Z0-9_]+$/.test(str);
    }
    function onSubmit(e)
    {
      e.preventDefault();
      try
      {
        if (state.error.key) throw new Error('error value / key');
        context.emit('submit', state.form);
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
      }
    }

    return {
      state,
      onUpdateKey,
      onSubmit,
    };
  },
  emits: {
    'submit': null,
  },
});
</script>

<style src="../../fieldset.scss" lang="scss" scoped></style>
