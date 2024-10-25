<template>
<article class="settings">
  <header class="header">
    <h1>슬라이드쇼 설정</h1>
    <nav>
      <button
        type="button"
        :disabled="bodyName === KEYS.PREFERENCE"
        @click="bodyName = KEYS.PREFERENCE">
        설정
      </button>
      <button
        type="button"
        :disabled="bodyName === KEYS.SLIDES"
        @click="bodyName = KEYS.SLIDES">
        슬라이드
      </button>
      <button
        type="button"
        :disabled="bodyName === KEYS.LANGUAGE"
        @click="bodyName = KEYS.LANGUAGE">
        언어
      </button>
    </nav>
  </header>
  <div class="container">
    <div class="body">
      <component :is="bodyComponent"/>
    </div>
  </div>
  <nav class="footer">
    <button
      type="button"
      title="닫기"
      class="close"
      @click="emits('close')">
      <Icon name="x"/>
    </button>
  </nav>
</article>
</template>

<script setup>
import { ref, shallowRef, watch } from 'vue'
import Preference from './preference.vue'
import Slides from './slides.vue'
import Language from './language.vue'
import Icon from '../../../slideshow/components/icon/index.vue'

const emits = defineEmits([ 'close' ])
const KEYS = {
  PREFERENCE: 'preference',
  SLIDES: 'slides',
  LANGUAGE: 'language'
}
const bodyName = ref(KEYS.PREFERENCE)
const bodyComponent = shallowRef(Preference)

watch(() => bodyName.value, (value) => {
  switch (value)
  {
    case KEYS.PREFERENCE:
    default:
      bodyComponent.value = Preference
      break
    case KEYS.SLIDES:
      bodyComponent.value = Slides
      break
    case KEYS.LANGUAGE:
      bodyComponent.value = Language
      break
  }
})
</script>

<style src="./index.scss" lang="scss" scoped></style>
