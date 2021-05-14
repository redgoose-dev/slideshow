<template>
<fieldset>
  <legend>General fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_name">
          {{$t('preference.general.name.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.general.name.description')}}
      </p>
      <div class="field-basic__body">
        <FormText
          name="pref_name"
          id="pref_name"
          :placeholder="$t('base.inputText')"
          :maxlength="30"
          v-model="state.name"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_description">
          {{$t('preference.general.description.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.general.description.description')}}
      </p>
      <div class="field-basic__body">
        <FormText
          type="textarea"
          name="pref_description"
          id="pref_description"
          :placeholder="$t('base.inputText')"
          v-model="state.description"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_language">
          {{$t('preference.general.language.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.general.language.description')}}
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_language"
          id="pref_language"
          v-model="state.language"
          @update:modelValue="onSave">
          <option value="en">{{$t('preference.general.language.option_en')}}</option>
          <option value="ko">{{$t('preference.general.language.option_ko')}}</option>
        </FormSelect>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_hud">
            {{$t('preference.general.hud.title')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('preference.general.hud.description')}}
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
          <label for="pref_hoverVisibleHud">
            {{$t('preference.general.hoverVisibleHud.title')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('preference.general.hoverVisibleHud.description')}}
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
        <label for="pref_hudContents">
          {{$t('preference.general.visibleContents.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.general.visibleContents.description')}}
      </p>
      <div class="field-basic__body">
        <ul class="field-checks">
          <li>
            <FormCheckbox
              name="pref_hudContents"
              id="pref_hudContents"
              :label="$t('preference.general.visibleContents.item_menu')"
              :modelValue="state.visibleHudContents.menu"
              @update:modelValue="o => onUpdateHudContents('menu', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              :label="$t('preference.general.visibleContents.item_thumbnail')"
              :modelValue="state.visibleHudContents.thumbnail"
              @update:modelValue="o => onUpdateHudContents('thumbnail', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              :label="$t('preference.general.visibleContents.item_caption')"
              :modelValue="state.visibleHudContents.caption"
              @update:modelValue="o => onUpdateHudContents('caption', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              :label="$t('preference.general.visibleContents.item_controller')"
              :modelValue="state.visibleHudContents.controller"
              @update:modelValue="o => onUpdateHudContents('controller', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              :label="$t('preference.general.visibleContents.item_paginate')"
              :modelValue="state.visibleHudContents.paginate"
              @update:modelValue="o => onUpdateHudContents('paginate', o)"/>
          </li>
        </ul>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_useStorage">
            {{$t('preference.general.browserStorage.title')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('preference.general.browserStorage.description')}}
        </p>
      </div>
      <div class="field-switch__input">
        <FormSwitch
          name="pref_useStorage"
          id="pref_useStorage"
          v-model="state.useStorage"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label>
          {{$t('preference.general.backup.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.general.backup.description')}}
      </p>
      <div class="field-basic__body">
        <div class="grid import-data">
          <div>
            <ButtonBasic color="key" @click="onClickBackup">
              {{$t('base.backup')}}
            </ButtonBasic>
          </div>
          <div>
            <ButtonBasic color="key" @click="onClickRestore">
              {{$t('base.restore')}}
            </ButtonBasic>
          </div>
        </div>
      </div>
    </div>

    <div class="field-basic">
      <h3 class="field-title">
        <label>
          {{$t('preference.general.reset.title')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('preference.general.reset.description')}}
      </p>
      <div class="field-basic__body">
        <ButtonBasic color="danger" @click="onClickReset">
          {{$t('preference.general.reset.label')}}
        </ButtonBasic>
      </div>
    </div>
  </div>
</fieldset>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n/index';
import * as object from '~/libs/object';
import * as local from '~/libs/local';
import * as string from '~/libs/string';
import FormText from '~/components/Form/Text';
import FormSelect from '~/components/Form/Select';
import FormSwitch from '~/components/Form/Switch';
import FormCheckbox from '~/components/Form/Checkbox';
import ButtonBasic from '~/components/Button/Basic';

export default defineComponent({
  name: 'PreferenceGeneral',
  components: {
    FormText,
    FormSelect,
    FormSwitch,
    FormCheckbox,
    ButtonBasic,
  },
  props: {
    structure: Object,
  },
  setup(props, context)
  {
    const store = useStore();
    const { t } = useI18n({ useScope: 'global' });
    let state = reactive({
      name: props.structure.name,
      description: props.structure.description,
      language: props.structure.language,
      hud: props.structure.hud,
      hoverVisibleHud: props.structure.hoverVisibleHud,
      visibleHudContents: object.convertPureObject(props.structure.visibleHudContents),
      useStorage: props.structure.useStorage,
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
    function onClickBackup()
    {
      if (!confirm(t('preference.general.confirms.backup'))) return;
      let result = {
        preference: object.convertPureObject(store.state.preference),
        slides: object.convertPureObject(store.state.slides),
      };
      const date = new Date();
      let dateFormat = `${date.getFullYear()}${string.twoDigit(date.getMonth() + 1)}${string.twoDigit(date.getDate())}`;
      const element = document.createElement('a');
      element.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(result, null, 2))}`);
      element.setAttribute('download', `slideshow_${dateFormat}.json`);
      element.click();
    }
    function onClickRestore()
    {
      return new Promise((resolve, reject) => {
        const el = document.createElement('input');
        el.setAttribute('type', 'file');
        el.setAttribute('accept', 'application/json');
        el.addEventListener('change', e => {
          if (!(e.target.files && e.target.files.length > 0))
          {
            alert(t('preference.general.alerts.noSelectedFile'));
            return;
          }
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = async e => {
            try
            {
              let json = JSON.parse(String(e.target.result));
              if (!confirm(t('preference.general.confirms.restore'))) return;
              if (!(json.preference && json.slides)) throw new Error('no data');
              store.dispatch('changePreference', json.preference);
              store.dispatch('changeSlides', json.slides);
              store.dispatch('changeMode', null);
              store.dispatch('changeActiveSlide', json.preference.slides.initialNumber);
              store.commit('updateUseKeyboardEvent', true);
              alert(t('preference.general.alerts.completeRestore'));
              local.main.restart();
            }
            catch(e)
            {
              alert(t('preference.general.alerts.failedRestore'));
            }
          };
          reader.readAsText(file);
        }, false);
        el.click();
      });
    }
    function onClickReset()
    {
      if (!confirm(t('preference.general.confirms.reset'))) return;
      store.dispatch('reset');
      local.main.restart();
    }

    return {
      state,
      onSave,
      onUpdateHudContents,
      onClickBackup,
      onClickRestore,
      onClickReset,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
@import "../../scss/mixins";
.import-data {
  --column: 1;
  --gap: 10px;
  @include responsive(tablet) {
    --column: 2;
  }
}
.reset {
  margin-top: 16px;
}
</style>
