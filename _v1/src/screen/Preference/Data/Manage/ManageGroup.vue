<template>
<form @submit="onSubmit">
  <fieldset>
    <legend>Manage slides group fields</legend>
    <div class="fields">
      <div class="field-basic">
        <h3 class="field-title">
          <label for="pref_key" class="required">
            {{t('base.groupKey')}}
          </label>
        </h3>
        <p class="field-description">
          {{t('description.inputKeyOnGroup')}}
        </p>
        <div class="field-basic__body">
          <FormText
            name="pref_key"
            id="pref_key"
            :placeholder="t('base.inputKey')"
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
          <label for="pref_name">{{t('base.name')}}</label>
        </h3>
        <p class="field-description">
          {{t('description.setCategoryName')}}
        </p>
        <div class="field-basic__body">
          <FormText
            name="pref_name"
            id="pref_name"
            :placeholder="t('base.inputText')"
            :maxlength="32"
            v-model="state.form.name"/>
        </div>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_description">
          {{t('base.description')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.setCategoryDescription')}}
      </p>
      <div class="field-basic__body">
        <FormText
          name="pref_description"
          id="pref_description"
          :placeholder="t('base.inputText')"
          :maxlength="80"
          v-model="state.form.description"/>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_slideType">
          {{t('title.selectSlidesType')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.selectSlidesType')}}
        {{form.type === 'edit' ? t('description.selectSlidesType2') : ''}}
      </p>
      <div class="field-basic__body">
        <FormRadio
          type="button"
          name="pref_slideType"
          id="prof_slideType"
          :title="t('title.selectSlidesType')"
          :items="[
              { key: 'array', label: t('base.array') },
              { key: 'url', label: `URL ${t('base.address')}` },
            ]"
          v-model="state.form.slidesType"/>
      </div>
    </div>
    <div v-if="state.form.slidesType === 'url'" class="field-basic">
      <h3 class="field-title">
        <label for="pref_slidesUrl">
          {{t('title.slidesUrlAddress')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.inputSlidesUrl')}}
      </p>
      <div class="field-basic__body">
        <FormText
          name="pref_slidesUrl"
          id="pref_slidesUrl"
          :placeholder="t('base.inputUrl')"
          :required="true"
          v-model="state.form.slidesUrl"/>
      </div>
    </div>
    <nav class="submit-buttons">
      <div>
        <ButtonBasic type="submit" color="key" :inline="true">
          {{form.type === 'add' ? t('label.addGroup') : t('label.editGroup')}}
        </ButtonBasic>
      </div>
    </nav>
  </fieldset>
</form>
</template>

<script setup>
import { reactive } from 'vue';
import i18n from '../../../../i18n';
import FormText from '../../../../components/Form/Text.vue';
import ButtonBasic from '../../../../components/Button/Basic.vue';
import FormRadio from '../../../../components/Form/Radio.vue';

const name = 'ManageGroup';
const { t } = i18n.global;
const props = defineProps({ form: Object });
const emits = defineEmits({ 'submit': null });
let state = reactive({
  form: props.form,
  error: {
    key: false,
  },
  slides: {
    type: props.form.slidesType || 'array', // url,array
    url: props.form.slidesUrl || '', // api url address
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
    if (state.error.key)
    {
      throw new Error('error value / key');
    }
    emits('submit', state.form);
  }
  catch(e)
  {
    if (window.dev) console.error(e.message);
    alert(t('alert.errorSubmit'));
  }
}
</script>

<style src="../../fieldset.scss" lang="scss" scoped></style>
