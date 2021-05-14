<template>
<fieldset>
  <legend>Slides fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_initialNumber">
          {{$t('preference.slides.initialNumber.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.slides.initialNumber.description')}}
      </p>
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
    </div>
    <hr class="field-line">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_animationType">
          {{$t('preference.slides.animationType.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.slides.animationType.description')}}
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_animationType"
          id="pref_animationType"
          v-model="state.animationType"
          @update:modelValue="onSave">
          <option value="none">
            {{$t('preference.slides.animationType.option_none')}}
          </option>
          <option value="fade">
            {{$t('preference.slides.animationType.option_fade')}}
          </option>
          <option value="horizontal">
            {{$t('preference.slides.animationType.option_horizontal')}}
          </option>
        </FormSelect>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_animationSpeed">
          {{$t('preference.slides.animationSpeed.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.slides.animationSpeed.description')}}
      </p>
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
    </div>
    <hr class="field-line">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_captionAnimationType">
          {{$t('preference.slides.captionAnimationType.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.slides.captionAnimationType.description')}}
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_captionAnimationType"
          id="pref_captionAnimationType"
          v-model="state.captionAnimationType"
          @update:modelValue="onSave">
          <option value="none">
            {{$t('preference.slides.captionAnimationType.option_none')}}
          </option>
          <option value="shuffle">
            {{$t('preference.slides.captionAnimationType.option_shuffle')}}
          </option>
        </FormSelect>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_captionAnimationSpeed">
          {{$t('preference.slides.captionAnimationSpeed.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.slides.captionAnimationSpeed.description')}}
      </p>
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
    </div>
    <hr class="field-line">
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_autoplay">
            {{$t('preference.slides.autoplay.title')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('preference.slides.autoplay.description')}}
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
        <label for="pref_autoplayDelay">
          {{$t('preference.slides.autoplayDelay.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.slides.autoplayDelay.description')}}
      </p>
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
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_autoplayDirection">
          {{$t('preference.slides.autoplayDirection.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.slides.autoplayDirection.description')}}
      </p>
      <div class="field-basic__inline">
        <FormRadio
          name="pref_autoplayDirection"
          id="pref_autoplayDirection"
          :items="[
            { key: false, label: $t('preference.slides.autoplayDirection.option_prev') },
            { key: true, label: $t('preference.slides.autoplayDirection.option_next') },
          ]"
          model-type="boolean"
          v-model="state.autoplayDirection"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_autoplayPauseOnHover">
            {{$t('preference.slides.autoplayPauseOnHover.title')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('preference.slides.autoplayPauseOnHover.description')}}
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
    <hr class="field-line">
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_loop">
            {{$t('preference.slides.loop.title')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('preference.slides.loop.description')}}
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
          <label for="pref_swipe">
            {{$t('preference.slides.swipe.title')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('preference.slides.swipe.description')}}
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
  </div>
</fieldset>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import * as object from '~/libs/object';
import FormText from '~/components/Form/Text';
import FormSelect from '~/components/Form/Select';
import FormSwitch from '~/components/Form/Switch';
import FormRadio from '~/components/Form/Radio';

export default defineComponent({
  name: 'PreferenceSlides',
  components: {
    FormText,
    FormSelect,
    FormSwitch,
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
