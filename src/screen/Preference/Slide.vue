<template>
<div class="preference-general">
  <fieldset>
    <legend>Slide fields</legend>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_name">Initial slide number</label>
      </h3>
      <div class="field-basic__body">
        <FormText
          type="tel"
          name="pref_initialNumber"
          id="pref_initialNumber"
          v-model="state.initialNumber"
          placeholder="0"
          :inline="true"
          :maxlength="3"
          :size="5"
          model-type="number"
          @update:modelValue="onSave"/>
      </div>
      <p class="field-description">
        최초 실행할때 활성화하는 슬라이드 번호
      </p>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_name">Animation type</label>
      </h3>
      <div class="field-basic__body">
        <FormSelect
          name="pref_animationType"
          id="pref_animationType"
          v-model="state.animationType"
          @update:modelValue="onSave">
          <option value="none">none</option>
          <option value="slide">slide</option>
          <option value="horizontal">horizontal</option>
        </FormSelect>
      </div>
      <p class="field-description">
        슬라이드가 바뀔때의 트랜지션을 선택합니다.
      </p>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_animationSpeed">Animation speed</label>
      </h3>
      <div class="field-basic__inline">
        <label class="label">
          <FormText
            type="tel"
            name="pref_animationSpeed"
            id="pref_animationSpeed"
            v-model="state.animationSpeed"
            placeholder="1000"
            :inline="true"
            :maxlength="4"
            :size="5"
            model-type="number"
            @update:modelValue="onSave"/>
          <span>ms</span>
        </label>
      </div>
      <p class="field-description">
        트랜지션 애니메이션 속도
      </p>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_captionAnimationType">Caption animation type</label>
      </h3>
      <div class="field-basic__body">
        <FormSelect
          name="pref_captionAnimationType"
          id="pref_captionAnimationType"
          v-model="state.captionAnimationType"
          @update:modelValue="onSave">
          <option value="none">None</option>
          <option value="shuffle">Shuffle</option>
        </FormSelect>
      </div>
      <p class="field-description">
        슬라이드가 바뀔때의 캡션 트랜지션을 선택합니다.
      </p>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_captionAnimationSpeed">Caption animation speed</label>
      </h3>
      <div class="field-basic__inline">
        <FormText
          type="tel"
          name="pref_captionAnimationSpeed"
          id="pref_captionAnimationSpeed"
          v-model="state.captionAnimationSpeed"
          placeholder="1000"
          :inline="true"
          :maxlength="4"
          :size="5"
          model-type="number"
          @update:modelValue="onSave"/>
      </div>
      <p class="field-description">
        값이 높을수록 애니메이션 속도가 빨라집니다.
      </p>
    </div>
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_autoplay">Autoplay</label>
        </h3>
        <p class="field-description">
          슬라이드를 자동재생 합니다.
        </p>
      </div>
      <div class="field-switch__input">
        <FormSwitch
          name="pref_autoplay"
          id="pref_autoplay"
          v-model="state.autoplay"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_autoplayDelay">Autoplay delay</label>
      </h3>
      <div class="field-basic__inline">
        <label class="label">
          <FormText
            type="tel"
            name="pref_autoplayDelay"
            id="pref_autoplayDelay"
            v-model="state.autoplayDelay"
            placeholder="1000"
            :inline="true"
            :maxlength="4"
            :size="5"
            model-type="number"
            @update:modelValue="onSave"/>
          <span>ms</span>
        </label>
      </div>
      <p class="field-description">
        슬라이드가 자동으로 전환하기 전에 대기하는 시간입니다.
      </p>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_autoplayDirection">Autoplay direction</label>
      </h3>
      <div class="field-basic__inline">
        <FormRadio
          name="pref_autoplayDirection"
          id="pref_autoplayDirection"
          :items="[
            { key: false, label: 'Prev' },
            { key: true, label: 'Next' },
          ]"
          model-type="boolean"
          v-model="state.autoplayDirection"
          @update:modelValue="onSave"/>
      </div>
      <p class="field-description">
        슬라이드가 자동으로 전환하는 방향
      </p>
    </div>
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_autoplayPauseOnHover">Autoplay pause on hover</label>
        </h3>
        <p class="field-description">
          슬라이드 영역에 마우스를 갖다대면 자동재생을 일시정지 합니다.
        </p>
      </div>
      <div class="field-switch__input">
        <FormSwitch
          name="pref_autoplayPauseOnHover"
          id="pref_autoplayPauseOnHover"
          v-model="state.autoplayPauseOnHover"
          @update:modelValue="onSave"/>
      </div>
    </div>

    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_loop">Loop</label>
        </h3>
        <p class="field-description">
          슬라이드를 마지막에서 처음으로 이동합니다.
        </p>
      </div>
      <div class="field-switch__input">
        <FormSwitch
          name="pref_loop"
          id="pref_loop"
          v-model="state.loop"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_swipe">Swipe</label>
        </h3>
        <p class="field-description">
          터치 디바이스에서 스와이프 조작을 사용합니다.
        </p>
      </div>
      <div class="field-switch__input">
        <FormSwitch
          name="pref_swipe"
          id="pref_swipe"
          v-model="state.swipe"
          @update:modelValue="onSave"/>
      </div>
    </div>
  </fieldset>
</div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import * as object from '~/libs/object';
import FormText from '~/components/Form/Text';
import FormSelect from '~/components/Form/Select';
import FormSwitch from '~/components/Form/Switch';
import FormCheckbox from '~/components/Form/Checkbox';
import FormRadio from '~/components/Form/Radio';

export default defineComponent({
  name: 'PreferenceSlide',
  components: {
    FormText,
    FormSelect,
    FormSwitch,
    FormCheckbox,
    FormRadio,
  },
  props: {
    structure: Object,
  },
  setup(props, context)
  {
    let state = reactive({
      initialNumber: props.structure.initialNumber,
      animationType: props.structure.animationType,
      animationSpeed: props.structure.animationSpeed,
      captionAnimationType: props.structure.captionAnimationType,
      captionAnimationSpeed: props.structure.captionAnimationSpeed,
      autoplay: props.structure.autoplay,
      autoplayDelay: props.structure.autoplayDelay,
      autoplayDirection: props.structure.autoplayDirection,
      autoplayPauseOnHover: props.structure.autoplayPauseOnHover,
      loop: props.structure.loop,
      swipe: props.structure.swipe,
    });

    // methods
    function onSave()
    {
      const structure = object.convertPureObject(state);
      context.emit('update', structure);
    }

    return {
      state,
      onSave,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
