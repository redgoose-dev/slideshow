<template>
<fieldset>
  <legend>Style fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_screenColor">
          {{t('title.screenMode')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.screenMode')}}
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_screenColor"
          id="pref_screenColor"
          v-model="state.screenColor"
          @update:modelValue="onSave">
          <option value="system">{{t('base.system')}}</option>
          <option value="light">{{t('base.lightMode')}}</option>
          <option value="dark">{{t('base.darkMode')}}</option>
        </FormSelect>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_imageType">
          {{t('label.imageType')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.imageType')}}
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_imageType"
          id="pref_imageType"
          v-model="state.imageType"
          @update:modelValue="onSave">
          <option value="none">
            {{t('base.none')}}
          </option>
          <option value="contain">
            {{t('base.contain')}}
          </option>
          <option value="cover">
            {{t('base.cover')}}
          </option>
        </FormSelect>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_imageScale">
          {{t('title.imageScale')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.imageScale')}}
      </p>
      <div class="field-basic__body">
        <FormText
          type="text"
          name="pref_imageScale"
          id="pref_imageScale"
          v-model="state.imageScale"
          placeholder="80%,80%"
          model-type="array"
          :inline="true"
          :size="16"
          @update:modelValue="onUpdateImageScale"/>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_captionScale">
          {{t('title.captionScale')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.captionScale')}}
      </p>
      <div class="field-basic__inline">
        <label class="label">
          <FormText
            type="tel"
            name="pref_captionScale"
            id="pref_captionScale"
            v-model="state.captionScale"
            placeholder="100"
            :inline="true"
            :maxlength="3"
            :size="5"
            model-type="number"
            @update:modelValue="onSave"/>
          <span>%</span>
        </label>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_captionPosition">
          {{t('title.captionPosition')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.captionPosition')}}
      </p>
      <div class="field-basic__body">
        <FormText
          type="text"
          name="pref_captionPosition"
          id="pref_captionPosition"
          v-model="state.captionPosition"
          placeholder="30px,30px"
          model-type="array"
          :inline="true"
          :size="16"
          @update:modelValue="onUpdateCaptionPosition"/>
      </div>
    </div>
  </div>
</fieldset>
</template>

<script setup>
import { reactive } from 'vue';
import i18n from '../../i18n';
import { convertPureObject } from '../../libs/object';
import FormText from '../../components/Form/Text.vue';
import FormSelect from '../../components/Form/Select.vue';

const name = 'PreferenceStyle';
const { t } = i18n.global;
const props = defineProps({ structure: Object });
const emits = defineEmits({ 'update': null });
let state = reactive({
  screenColor: props.structure.screenColor,
  imageType: props.structure.imageType,
  imageScale: props.structure.imageScale,
  captionScale: props.structure.captionScale,
  captionPosition: props.structure.captionPosition,
});

// methods
function onSave()
{
  const structure = convertPureObject(state);
  emits('update', structure);
}
function onUpdateImageScale(s)
{
  state.imageScale = s.split(',');
  onSave();
}
function onUpdateCaptionPosition(s)
{
  state.captionPosition = s.split(',');
  onSave();
}
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
