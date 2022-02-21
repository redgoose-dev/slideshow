<template>
<fieldset class="pref-data">
  <legend>Data fields</legend>
  <div class="fields">
    <div class="field-basic">
      <h3 class="field-title">
        {{t('title.manageSlideData')}}
      </h3>
      <div class="field-basic__body">
        <div class="manage-tree">
          <nav class="manage-tree-toolbar">
            <div>
              <FormRadio
                type="button"
                name="pref_mode"
                id="prof_mode"
                :title="t('title.changeMode')"
                :items="[
                  { key: 'basic', label: t('base.basic') },
                  { key: 'advanced', label: t('base.advanced') },
                ]"
                :modelValue="localState.mode"
                @update:model-value="onChangeMode"
                class="manage-tree__mode"/>
            </div>
            <div>
              <ButtonIcon
                :title="t('title.importSlideData')"
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
              :placeholder="t('description.inputSlideDataCode')"
              :rows="15"
              :color="localState.textTreeColor"
              v-model="state.tree"
              @update:modelValue="onUpdateTreeSource"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="#slideshowModal">
    <ModalWrapper
      v-if="localState.showImportData"
      :title="t('title.getSlideItems')"
      class="pref-data__import-data"
      @close="localState.showImportData = false">
      <ImportData @update="onImportData"/>
    </ModalWrapper>
  </teleport>
</fieldset>
</template>

<script setup>
import { reactive } from 'vue';
import i18n from '../../../i18n';
import { checkTree } from '../../../libs/object';
import { objectToString } from '../../../libs/string';
import FormText from '../../../components/Form/Text.vue';
import FormRadio from '../../../components/Form/Radio.vue';
import ButtonIcon from './ButtonIcon.vue';
import Manage from './Manage/index.vue';
import ModalWrapper from './ModalWrapper.vue';
import ImportData from './ImportData.vue';

const { t } = i18n.global;
const props = defineProps({ structure: Object });
const emits = defineEmits({ 'update': null });
let localState = reactive({
  mode: 'basic', // basic,advanced
  showImportData: false,
  textTreeColor: undefined,
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
    alert(t('alert.invalidData'));
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
      emits('update', { tree });
    }
    catch(e)
    {
      localState.textTreeColor = 'error';
    }
  }, 600);
}
function onUpdateTreeUI(tree)
{
  state.tree = tree;
  emits('update', { tree });
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
  emits('update', { tree: res });
  localState.showImportData = false;
}
</script>

<style src="../fieldset.scss" lang="scss" scoped></style>
<style src="./index.scss" lang="scss" scoped></style>
