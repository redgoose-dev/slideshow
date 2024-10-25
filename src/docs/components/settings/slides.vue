<template>
<article class="page">
  <h1 class="title">슬라이드 데이터</h1>
  <p class="description">
    슬라이드쇼에서 플레이되는 슬라이드 데이터를 편집합니다.
  </p>
  <div class="body">
    <JsonEditorWrapper
      v-model="slides.data"
      :theme="slideshowState.theme"
      :live="true"
      :open-depth="2"
      edit="all"
      class="editor"
      @update:model-value="onUpdateEditor"/>
  </div>
</article>
</template>

<script setup>
import { stateStore, slidesStore } from '../../stores.js'
import JsonEditorWrapper from '../json-editor-wrapper/index.vue'

const slideshowState = stateStore()
const slides = slidesStore()

function onUpdateEditor(detail)
{
  slides.update(detail)
}
</script>

<style lang="scss" scoped>
@use './pages';
</style>
