<template>
<fieldset>
  <legend>Style fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_screenColor">Screen mode</label>
      </h3>
      <p class="field-description">
        화면모드를 선택합니다.
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_screenColor"
          id="pref_screenColor"
          v-model="state.screenColor"
          @update:modelValue="onSave">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </FormSelect>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_imageType">Image type</label>
      </h3>
      <p class="field-description">
        슬라이드 이미지의 표시방법
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_imageType"
          id="pref_imageType"
          v-model="state.imageType"
          @update:modelValue="onSave">
          <option value="none">None</option>
          <option value="contain">Contain</option>
          <option value="cover">Cover</option>
        </FormSelect>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_imageScale">Image scale</label>
      </h3>
      <p class="field-description">
        슬라이드 이미지 사이즈를 정합니다. 예) width,height
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
        <label for="pref_captionScale">Caption scale</label>
      </h3>
      <p class="field-description">
        캡션의 크기를 결정하는 값입니다.
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
        <label for="pref_captionPosition">Caption position</label>
      </h3>
      <p class="field-description">
        캡션의 위치 예) left,top
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
import * as object from '~/libs/object';
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
      const structure = object.convertPureObject(state);
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
