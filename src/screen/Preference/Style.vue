<template>
<fieldset>
  <legend>Style fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_screenColor">
          {{$t('preference.style.screenColor.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.style.screenColor.description')}}
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_screenColor"
          id="pref_screenColor"
          v-model="state.screenColor"
          @update:modelValue="onSave">
          <option value="system">{{$t('base.system')}}</option>
          <option value="light">{{$t('base.lightMode')}}</option>
          <option value="dark">{{$t('base.darkMode')}}</option>
        </FormSelect>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_imageType">
          {{$t('label.imageType')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.style.imageType.description')}}
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_imageType"
          id="pref_imageType"
          v-model="state.imageType"
          @update:modelValue="onSave">
          <option value="none">
            {{$t('base.none')}}
          </option>
          <option value="contain">
            {{$t('base.contain')}}
          </option>
          <option value="cover">
            {{$t('base.cover')}}
          </option>
        </FormSelect>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_imageScale">
          {{$t('preference.style.imageScale.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.style.imageScale.description')}}
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
          {{$t('preference.style.captionScale.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.style.captionScale.description')}}
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
          {{$t('preference.style.captionPosition.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.style.captionPosition.description')}}
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

<script>
import { defineComponent, reactive } from 'vue';
import { convertPureObject } from '~/libs/object';
import FormText from '~/components/Form/Text';
import FormSelect from '~/components/Form/Select';

export default defineComponent({
  name: 'PreferenceStyle',
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
      context.emit('update', structure);
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

    return {
      state,
      onSave,
      onUpdateImageScale,
      onUpdateCaptionPosition,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
