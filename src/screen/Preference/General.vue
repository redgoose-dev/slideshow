<template>
<fieldset>
  <legend>General fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_language">
          {{$t('base.language')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('description.language')}}
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_language"
          id="pref_language"
          v-model="state.language"
          @update:modelValue="onSave">
          <option value="en">{{$t('language.en')}}</option>
          <option value="ko">{{$t('language.ko')}}</option>
        </FormSelect>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_hud">
            {{$t('base.hud')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('description.hud')}}
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
            {{$t('title.hoverVisibleHud')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('description.hoverVisibleHud')}}
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
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_clickVisibleHud">
            {{$t('title.touchHud')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('description.touchHud')}}
        </p>
      </div>
      <div class="field-switch__input">
        <FormSwitch
          name="pref_clickVisibleHud"
          id="pref_clickVisibleHud"
          v-model="state.clickVisibleHud"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_hudContents">
          {{$t('title.visibleContents')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('description.visibleContents')}}
      </p>
      <div class="field-basic__body">
        <ul class="field-checks">
          <li>
            <FormCheckbox
              name="pref_hudContents"
              id="pref_hudContents"
              :label="$t('base.menu')"
              :modelValue="state.visibleHudContents.menu"
              @update:modelValue="o => onUpdateHudContents('menu', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              :label="$t('base.caption')"
              :modelValue="state.visibleHudContents.caption"
              @update:modelValue="o => onUpdateHudContents('caption', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              :label="$t('base.controller')"
              :modelValue="state.visibleHudContents.controller"
              @update:modelValue="o => onUpdateHudContents('controller', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              :label="$t('base.paginate')"
              :modelValue="state.visibleHudContents.paginate"
              @update:modelValue="o => onUpdateHudContents('paginate', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              :label="$t('base.autoplay')"
              :modelValue="state.visibleHudContents.autoplay"
              @update:modelValue="o => onUpdateHudContents('autoplay', o)"/>
          </li>
        </ul>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-basic">
      <h3 class="field-title">
        <label>
          {{$t('title.backupOrRestore')}}
        </label>
      </h3>
      <p class="field-description">
        {{$t('description.backup')}}
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
        <label>{{$t('base.reset')}}</label>
      </h3>
      <p class="field-description">
        {{$t('description.reset')}}
      </p>
      <div class="field-basic__body">
        <ButtonBasic color="danger" @click="onClickReset">
          {{$t('base.resetSlideshow')}}
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
      language: props.structure.language,
      hud: props.structure.hud,
      hoverVisibleHud: props.structure.hoverVisibleHud,
      clickVisibleHud: props.structure.clickVisibleHud,
      visibleHudContents: object.convertPureObject(props.structure.visibleHudContents),
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
      if (!confirm(t('confirm.backup'))) return;
      let result = {
        preference: object.convertPureObject(store.state.preference),
        tree: object.convertPureObject(store.state.tree),
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
            alert(t('alert.noSelectedFile'));
            return;
          }
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = e => {
            try
            {
              let json = JSON.parse(String(e.target.result));
              if (!confirm(t('confirm.restore'))) return;

              if (!(json.preference && json.tree)) throw new Error('no data');
              store.dispatch('changePreference', json.preference);
              store.dispatch('changeTree', json.tree);
              store.dispatch('changeMode', null);
              store.dispatch('changeActiveSlide', json.preference.slides.initialNumber);
              store.dispatch('changeAutoplay', false);
              store.commit('updateUseKeyboardEvent', true);
              alert(t('alert.completeRestore'));
              local.main.restart().then();
            }
            catch(e)
            {
              alert(t('alert.failedRestore'));
            }
          };
          reader.readAsText(file);
        }, false);
        el.click();
      });
    }
    function onClickReset()
    {
      if (!confirm(t('confirm.reset'))) return;
      store.dispatch('reset').then(() => local.main.restart().then());
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
