<template>
<article class="page">
  <h1 class="title">언어 데이터</h1>
  <p class="description">
    슬라이드쇼에서 사용되는 문구들을 다른 언어로 변경할 수 있습니다.
  </p>
  <div class="body">
    <JsonEditorWrapper
      v-model="language.data"
      :theme="slideshowState.theme"
      :live="true"
      :open-depth="2"
      edit="value"
      class="editor"
      @update:model-value="onUpdateEditor"/>
  </div>
</article>
</template>

<script setup>
import { stateStore, languageStore } from '../../stores.js'
import JsonEditorWrapper from '../json-editor-wrapper/index.vue'

const slideshowState = stateStore()
const language = languageStore()

function onUpdateEditor(detail)
{
  language.update(detail)
}
</script>

<style lang="scss" scoped>
@use './pages';
</style>
