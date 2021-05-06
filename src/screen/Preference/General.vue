<template>
<div class="preference-general">
  <fieldset>
    <legend>General fields</legend>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_name">Name</label>
      </h3>
      <div class="field-basic__body">
        <FormText
          name="pref_name"
          id="pref_name"
          placeholder="Please input text"
          v-model="state.name"
          @update:modelValue="onSave"/>
        <p class="field-description">
          TODO
        </p>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_description">Description</label>
      </h3>
      <div class="field-basic__body">
        <FormText
          type="textarea"
          name="pref_description"
          id="pref_description"
          placeholder="Please input text"
          v-model="state.description"
          @update:modelValue="onSave"/>
        <p class="field-description">
          TODO
        </p>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_language">Language</label>
      </h3>
      <div class="field-basic__body">
        <FormSelect
          name="pref_language"
          id="pref_language"
          :placeholder="null"
          v-model="state.language"
          @update:modelValue="onSave">
          <option value="en">English</option>
          <option value="ko">Korean</option>
        </FormSelect>
      </div>
    </div>
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_hud">Visible HUD</label>
        </h3>
        <p class="field-description">
          TODO
        </p>
      </div>
      <div class="field-switch__input">
        <FormSwitch
          name="pref_hud"
          id="pref_hud"
          v-model="state.hud"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_hoverVisibleHud">Visible Hover HUD</label>
        </h3>
        <p class="field-description">
          If you overlay mouse, HUD will be hidden.
        </p>
      </div>
      <div class="field-switch__input">
        <FormSwitch
          name="pref_hoverVisibleHud"
          id="pref_hoverVisibleHud"
          v-model="state.hoverVisibleHud"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_visibleHudContents">Visible HUD Contents</label>
      </h3>
      <div class="field-basic__body">
        <ul class="field-checks">
          <li>
            <FormCheckbox
              name="pref_hudContents_menu"
              id="pref_hudContents_menu"
              label="Menu"
              :modelValue="state.visibleHudContents.menu"
              @update:modelValue="o => onUpdateHudContents('menu', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents_thumbnail"
              id="pref_hudContents_thumbnail"
              label="Thumbnail"
              :modelValue="state.visibleHudContents.thumbnail"
              @update:modelValue="o => onUpdateHudContents('thumbnail', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents_caption"
              id="pref_hudContents_caption"
              label="Caption"
              :modelValue="state.visibleHudContents.caption"
              @update:modelValue="o => onUpdateHudContents('caption', o)"/>
          </li>

          <li>
            <FormCheckbox
              name="pref_hudContents_controller"
              id="pref_hudContents_controller"
              label="Controller"
              :modelValue="state.visibleHudContents.controller"
              @update:modelValue="o => onUpdateHudContents('controller', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents_paginate"
              id="pref_hudContents_paginate"
              label="Paginate"
              :modelValue="state.visibleHudContents.paginate"
              @update:modelValue="o => onUpdateHudContents('paginate', o)"/>
          </li>
        </ul>
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

export default defineComponent({
  name: 'PreferenceGeneral',
  components: {
    FormText,
    FormSelect,
    FormSwitch,
    FormCheckbox,
  },
  props: {
    structure: Object,
  },
  setup(props, context)
  {
    let state = reactive({
      name: props.structure.name,
      description: props.structure.description,
      language: props.structure.language,
      hud: props.structure.hud,
      hoverVisibleHud: props.structure.hoverVisibleHud,
      visibleHudContents: props.structure.visibleHudContents,
    });

    // methods
    function onSave()
    {
      const structure = object.convertPureObject(state);
      context.emit('update', structure);
    }
    function onUpdateHudContents(key, value)
    {
      state.visibleHudContents[key] = value;
      onSave();
    }

    return {
      state,
      onSave,
      onUpdateHudContents,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.preference-general {}
</style>
