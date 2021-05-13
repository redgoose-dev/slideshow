<template>
<fieldset>
  <legend>General fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_name">Name</label>
      </h3>
      <p class="field-description">
        슬라이드 제목을 입력합니다.
      </p>
      <div class="field-basic__body">
        <FormText
          name="pref_name"
          id="pref_name"
          placeholder="Please input text"
          v-model="state.name"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_description">Description</label>
      </h3>
      <p class="field-description">
        슬라이드에 대한 설명을 입력합니다.
      </p>
      <div class="field-basic__body">
        <FormText
          type="textarea"
          name="pref_description"
          id="pref_description"
          placeholder="Please input text"
          v-model="state.description"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-basic">
      <h3 class="field-title">
        <label for="pref_language">Language</label>
      </h3>
      <p class="field-description">
        메시지 언어를 설정합니다.
      </p>
      <div class="field-basic__body">
        <FormSelect
          name="pref_language"
          id="pref_language"
          v-model="state.language"
          @update:modelValue="onSave">
          <option value="en">English</option>
          <option value="ko">Korean</option>
        </FormSelect>
      </div>
    </div>
    <hr class="field-line">
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_hud">Visible HUD</label>
        </h3>
        <p class="field-description">
          조작과 상태요소를 보여줍니다.
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
          슬라이드 영역에 마우스를 갖다대면 조작과 상태요소를 숨깁니다.<br/>
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
        <label for="pref_hudContents">Visible HUD Contents</label>
      </h3>
      <p class="field-description">
        각 조작과 상태요소들 표시를 조절합니다.
      </p>
      <div class="field-basic__body">
        <ul class="field-checks">
          <li>
            <FormCheckbox
              name="pref_hudContents"
              id="pref_hudContents"
              label="Menu"
              :modelValue="state.visibleHudContents.menu"
              @update:modelValue="o => onUpdateHudContents('menu', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              label="Thumbnail"
              :modelValue="state.visibleHudContents.thumbnail"
              @update:modelValue="o => onUpdateHudContents('thumbnail', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              label="Caption"
              :modelValue="state.visibleHudContents.caption"
              @update:modelValue="o => onUpdateHudContents('caption', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              label="Controller"
              :modelValue="state.visibleHudContents.controller"
              @update:modelValue="o => onUpdateHudContents('controller', o)"/>
          </li>
          <li>
            <FormCheckbox
              name="pref_hudContents"
              label="Paginate"
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
          <label for="pref_useStorage">Using browser storage</label>
        </h3>
        <p class="field-description">
          슬라이드 데이터와 환경설정을 브라우저에 저장합니다.
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
        <label>Backup & Restore</label>
      </h3>
      <p class="field-description">
        슬라이드쇼의 모든 데이터를 가져오거나 내보냅니다.
      </p>
      <div class="field-basic__body">
        <div class="grid import-data">
          <div>
            <ButtonBasic color="key" @click="onClickBackup">
              Backup
            </ButtonBasic>
          </div>
          <div>
            <ButtonBasic color="key" @click="onClickRestore">
              Restore
            </ButtonBasic>
          </div>
        </div>
      </div>
    </div>

    <div class="field-basic">
      <h3 class="field-title">
        <label>Reset slideshow</label>
      </h3>
      <p class="field-description">
        모든 설정과 슬라이드 데이터를 재설정합니다.
      </p>
      <div class="field-basic__body">
        <ButtonBasic color="danger" @click="onClickReset">
          Reset slideshow
        </ButtonBasic>
      </div>
    </div>
  </div>
</fieldset>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
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
      if (!confirm('정말 모든 데이터를 백업할까요?\n백업한 내용은 json 파일로 저장됩니다.')) return;
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
            alert('선택한 파일이 없습니다.');
            return;
          }
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = async e => {
            try
            {
              let json = JSON.parse(String(e.target.result));
              if (!confirm(`정말 모든 데이터를 복원할까요?\n이 작업은 현재 데이터가 모두 삭제됩니다.`)) return;
              if (!(json.preference && json.slides)) throw new Error('no data');
              store.commit('updatePreference', json.preference);
              store.commit('updateSlides', json.slides);
              store.commit('changeMode', null);
              store.commit('changeActiveSlide', json.preference.slides.initialNumber);
              store.commit('useKeyboardEvent', true);
              alert('복원을 완료했습니다.');
              local.main.restart();
            }
            catch(e)
            {
              alert('복원에 실패했습니다.');
            }
          };
          reader.readAsText(file);
        }, false);
        el.click();
      });
    }
    function onClickReset()
    {
      if (!confirm('정말로 모든 설정과 슬라이드 데이터를 초기화 하겠습니까?\n초기화하면 복구할 수 없습니다.')) return;
      store.commit('reset');
      alert('초기화 되었습니다.');
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
