<template>
<article class="page">
  <h1 class="title">슬라이드쇼 설정</h1>
  <p class="description">
    슬라이드쇼에서 사용되는 설정값을 조정합니다.
  </p>
  <div class="body">
    <JsonEditorWrapper
      v-model="preference.data"
      :theme="slideshowState.theme"
      :live="true"
      :open-depth="3"
      edit="value"
      class="editor"
      @update:model-value="onUpdateEditor"/>
  </div>
</article>
</template>

<script setup>
import { stateStore, preferenceStore } from '../../stores.js'
import JsonEditorWrapper from '../json-editor-wrapper/index.vue'

const slideshowState = stateStore()
const preference = preferenceStore()

function onUpdateEditor(detail)
{
  preference.update(detail)
}
</script>

<style lang="scss" scoped>
@use './pages';
</style>
