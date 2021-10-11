<template>
<form class="import-data" @submit="onSubmit">
  <fieldset>
    <legend>Import data fields</legend>
    <div class="fields">
      <div class="field-basic">
        <div class="field-basic__body">
          <FormRadio
            name="pref_mode"
            id="prof_mode"
            :title="t('description.importDataMethod')"
            :items="[
              { key: 'address', label: t('base.address') },
              { key: 'file', label: t('base.file') },
            ]"
            v-model="state.mode"/>
        </div>
      </div>
      <div v-if="state.mode === 'address'" class="field-basic">
        <h3 class="field-title">
          <label for="pref_address">
            {{t('title.importDataByAddress')}}
          </label>
        </h3>
        <p class="field-description">
          {{t('description.getDataByRestAPI')}}
        </p>
        <div class="field-basic__body">
          <FormText
            ref="address"
            name="pref_address"
            id="pref_address"
            :placeholder="t('base.inputAddress')"
            v-model="state.address"/>
        </div>
      </div>
      <div v-if="state.mode === 'file'" class="field-basic">
        <h3 class="field-title">
          <label for="pref_address">
            {{t('title.importDataByFile')}}
          </label>
        </h3>
        <p class="field-description">
          {{t('description.getJsonFile')}}
        </p>
        <div class="field-basic__body">
          <FormUpload
            ref="file"
            accept="application/json"
            :label="t('description.selectJsonFile')"
            @change="onSelectFile"/>
        </div>
      </div>
    </div>
    <nav class="submit-buttons">
      <div>
        <ButtonBasic
          type="submit"
          :color="state.processing ? '' : 'key'"
          :disabled="state.processing"
          :inline="true">
          {{state.processing ? t('base.processing') : t('label.getData')}}
        </ButtonBasic>
      </div>
    </nav>
  </fieldset>
</form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import i18n from '~/i18n';
import { getApiData, getFileData } from '~/libs/util';
import { checkTree } from '~/libs/object';
import FormRadio from '~/components/Form/Radio.vue';
import FormText from '~/components/Form/Text.vue';
import FormUpload from '~/components/Form/Upload.vue';
import ButtonBasic from '~/components/Button/Basic.vue';

const { t } = i18n.global;
let state = reactive({
  mode: 'address', // address,file
  address: 'https://raw.githubusercontent.com/redgoose-dev/slideshow/main/resource/example/tree.json',
  file: null,
  processing: false,
});
const address = ref(null);
const file = ref(null);
const emits = defineEmits({ 'update': null });

// methods
function onSelectFile(e)
{
  if (e[0]) state.file = e[0];
}
async function onSubmit(e)
{
  e.preventDefault();
  state.processing = true;
  try
  {
    let res;
    switch (state.mode)
    {
      case 'address':
        if (!state.address)
        {
          address.value.focus();
          throw new Error('no address');
        }
        res = await getApiData(state.address);
        break;
      case 'file':
        if (!state.file)
        {
          file.value.focus();
          throw new Error('no file');
        }
        res = await getFileData(state.file);
        break;
      default:
        throw new Error('no mode');
    }
    if (Array.isArray(res))
    {
      res = {
        default: {
          slides: res,
        }
      };
    }
    checkTree(res);
    emits('update', res);
    state.processing = false;
  }
  catch(e)
  {
    if (window.dev) console.error(e.message);
    alert(t('alert.failedGetData'));
    state.processing = false;
  }
}
</script>

<style lang="scss" scoped>
@use '../fieldset.scss';
</style>
