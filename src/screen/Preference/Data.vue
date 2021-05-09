<template>
<fieldset>
  <legend>Data fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="api_address">API Address</label>
      </h3>
      <div class="field-multiple">
        <div class="field-multiple__body">
          <FormText
            type="text"
            name="api_address"
            id="api_address"
            v-model="state.apiAddress"
            placeholder="https://service.com/filename.json"/>
        </div>
        <div>
          <ButtonBasic
            color="key"
            @click="importDataOnAddress">
            Get data
          </ButtonBasic>
        </div>
      </div>
      <p class="field-description">
        데이터를 RestAPI를 통하여 가져옵니다.
      </p>
      <div class="field-upload">
        <FormUpload
          accept="application/json"
          @change="importDataOnFile"/>
      </div>
      <p class="field-description">
        슬라이드 데이터를 json 파일을 업로드하여 가져옵니다.
      </p>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_description">Edit slide data</label>
      </h3>
      <p class="field-description">
        데이터를 `RestAPI`를 통하여 가져옵니다.
      </p>
      <div class="field-basic__body">
        <!-- TODO: 입력할때마다 데이터를 갱신하면 오류체크가 많이 일어나기 때문에 진짜로 적용시키는 장치가 필요해 보인다. -->
        <FormText
          type="textarea"
          name="pref_dataText"
          id="pref_dataText"
          placeholder="Please input JSON code"
          :rows="8"
          v-model="state.dataText"
          @update:modelValue="onSave"/>
      </div>
    </div>
  </div>
</fieldset>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import * as object from '~/libs/object';
import FormText from '~/components/Form/Text';
import FormUpload from '~/components/Form/Upload';
import ButtonBasic from '~/components/Button/Basic';

export default defineComponent({
  name: 'PreferenceData',
  components: {
    FormText,
    FormUpload,
    ButtonBasic,
  },
  props: {},
  setup(props, context)
  {
    let state = reactive({
      apiAddress: '',
      dataText: '',
    });

    // methods
    function onSave()
    {
      const structure = object.convertPureObject(state);
      context.emit('update', structure);
    }
    function importDataOnAddress()
    {
      console.log('importDataOnAddress()');
    }
    function importDataOnFile()
    {
      console.log('importDataOnFile()');
    }

    return {
      state,
      onSave,
      importDataOnAddress,
      importDataOnFile,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.field-multiple {
  display: flex;
  margin: 10px 0 0;
  &__body {
    flex: 1;
    margin-right: 10px;
  }
}
.field-upload {
  margin-top: 20px;
}
</style>
