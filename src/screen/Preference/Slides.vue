<template>
<fieldset>
  <legend>Slides fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_initialNumber">
          {{t('title.initialNumber')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.initialNumber')}}
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
          {{t('title.transitionType')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.transitionType')}}
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_animationType"
          id="pref_animationType"
          v-model="state.animationType"
          @update:modelValue="onSave">
          <option value="none">
            {{t('base.none')}}
          </option>
          <option value="fade">
            {{t('label.fadeInOut')}}
          </option>
          <option value="horizontal">
            {{t('label.moveHorizontal')}}
          </option>
        </FormSelect>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_animationSpeed">
          {{t('title.transitionSpeed')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.transitionSpeed')}}
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
          {{t('title.captionAnimationType')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.captionAnimationType')}}
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_captionAnimationType"
          id="pref_captionAnimationType"
          v-model="state.captionAnimationType"
          @update:modelValue="onSave">
          <option value="none">
            {{t('base.none')}}
          </option>
          <option value="shuffle">
            {{t('base.shuffleText')}}
          </option>
        </FormSelect>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_captionAnimationSpeed">
          {{t('title.captionAnimationSpeed')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.captionAnimationSpeed')}}
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
            {{t('base.autoplay')}}
          </label>
        </h3>
        <p class="field-description">
          {{t('description.autoplay')}}
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
          {{t('title.autoplayDelay')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.autoplayDelay')}}
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
          {{t('title.autoplayDirection')}}
        </label>
      </h3>
      <p class="field-description">
        {{t('description.autoplayDirection')}}
      </p>
      <div class="field-basic__inline">
        <FormRadio
          name="pref_autoplayDirection"
          id="pref_autoplayDirection"
          :inline="true"
          :items="[
            { key: false, label: t('base.previous') },
            { key: true, label: t('base.next') },
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
            {{t('title.autoplayPauseOnHover')}}
          </label>
        </h3>
        <p class="field-description">
          {{t('description.autoplayPauseOnHover')}}
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
            {{t('base.repeat')}}
          </label>
        </h3>
        <p class="field-description">
          {{t('description.repeat')}}
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
            {{t('base.swipe')}}
          </label>
        </h3>
        <p class="field-description">
          {{t('description.swipe')}}
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

<script setup>
import { reactive } from 'vue';
import i18n from '~/i18n';
import * as object from '~/libs/object';
import FormText from '~/components/Form/Text.vue';
import FormSelect from '~/components/Form/Select.vue';
import FormSwitch from '~/components/Form/Switch.vue';
import FormRadio from '~/components/Form/Radio.vue';

const name = 'PreferenceSlides';
const { t } = i18n.global;
const props = defineProps({ structure: Object });
const emits = defineEmits({ 'update': null });
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
  emits('update', structure);
}
</script>

<style lang="scss" scoped>
@use './fieldset';
</style>
