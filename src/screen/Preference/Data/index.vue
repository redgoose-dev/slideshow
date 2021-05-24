<template>
<fieldset class="pref-data">
  <legend>Data fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        {{$t('preference.data.tree.title')}}
      </h3>
      <div class="field-basic__body">
        <div class="manage-tree">
          <nav class="manage-tree-toolbar">
            <div>
              <FormRadio
                type="button"
                name="pref_mode"
                id="prof_mode"
                :title="$t('preference.data.tree.changeMode')"
                :items="[
                  {
                    key: 'basic',
                    label: $t('preference.data.tree.mode_basic'),
                  },
                  {
                    key: 'advanced',
                    label: $t('preference.data.tree.mode_advanced'),
                  },
                ]"
                :modelValue="localState.mode"
                @update:model-value="onChangeMode"
                class="manage-tree__mode"/>
            </div>
            <div>
              <ButtonIcon
                :title="$t('preference.data.tree.importData')"
                icon-name="download"
                class="manage-tree__button"
                @click="localState.showImportData = true"/>
            </div>
          </nav>
          <div class="manage-tree-body">
            <Manage
              v-if="localState.mode === 'basic'"
              :tree="state.tree"
              @update="onUpdateTreeUI"/>
            <FormText
              v-else-if="localState.mode === 'advanced'"
              ref="tree"
              type="textarea"
              name="pref_tree"
              id="pref_tree"
              :placeholder="$t('preference.data.tree.textPlaceholder')"
              :rows="15"
              :color="localState.textTreeColor"
              v-model="state.tree"
              @update:modelValue="onUpdateTreeSource"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <ModalWrapper
      v-if="localState.showImportData"
      title="Get slide items"
      class="pref-data__import-data"
      @close="localState.showImportData = false">
      <ImportData @update="onImportData"/>
    </ModalWrapper>
  </teleport>
</fieldset>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n/index';
import { checkTree } from '~/libs/object';
import { objectToString } from '~/libs/string';
import FormText from '~/components/Form/Text';
import FormSelect from '~/components/Form/Select';
import FormRadio from '~/components/Form/Radio';
import ButtonIcon from './ButtonIcon';
import Manage from './Manage';
import ModalWrapper from './ModalWrapper';
import ImportData from './ImportData';

export default defineComponent({
  name: 'PreferenceData',
  components: {
    FormText,
    FormSelect,
    FormRadio,
    ButtonIcon,
    Manage,
    ModalWrapper,
    ImportData,
  },
  props: {
    structure: Object,
  },
  setup(props, context)
  {
    const { t } = useI18n({ useScope: 'global' });
    let localState = reactive({
      mode: 'basic', // basic,advanced
      showImportData: false,
      textTreeColor: undefined,
      computedTreeText: computed(() => {
        return JSON.stringify(state.tree, null, 2)
      }),
    });
    let state = reactive({
      tree: localState.mode === 'advanced' ? JSON.stringify(props.structure.tree, null, 2) : props.structure.tree,
    });
    let timer;

    // methods
    function onChangeMode(key)
    {
      try
      {
        switch (key)
        {
          case 'basic':
            let tree = JSON.parse(state.tree);
            if (!checkTree(tree)) throw new Error('error tree');
            state.tree = tree;
            localState.mode = key;
            break;
          case 'advanced':
            state.tree = objectToString(state.tree);
            localState.mode = key;
            break;
        }
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        alert(t('preference.data.alerts.invalidData'));
      }
    }
    function onUpdateTreeSource(str)
    {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        try
        {
          let tree = JSON.parse(str);
          localState.textTreeColor = undefined;
          // update parent component
          context.emit('update', { tree });
        }
        catch(e)
        {
          localState.textTreeColor = 'error';
        }
      }, 600);
    }
    function onUpdateTreeUI(tree)
    {
      // TODO: `TreeUI`에서 데이터가 업데이트 되었을때 호출되는 함수
      // TODO: 나중에 작업하기
      console.log('call onUpdateTreeUI()');
    }
    function onImportData(res)
    {
      switch (localState.mode)
      {
        case 'advanced':
          state.tree = objectToString(res);
          break;
        default:
          state.tree = res;
          break;
      }
      context.emit('update', { tree: res });
      localState.showImportData = false;
    }

    return {
      state,
      localState,
      onChangeMode,
      onUpdateTreeSource,
      onUpdateTreeUI,
      onImportData,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="../fieldset.scss" lang="scss" scoped></style>
<style src="./index.scss" lang="scss" scoped></style>
