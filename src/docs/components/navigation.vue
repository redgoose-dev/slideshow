<template>
<nav class="navigation">
  <ul>
    <li v-if="visibleAutoplay">
      <button
        type="button"
        title="오토플레이"
        :class="[
          'autoplay',
          slideshowState.autoplay && 'on',
        ]"
        @click.stop="onClickAutoplay">
        <Icon name="circle-play"/>
      </button>
    </li>
    <li>
      <button
        type="button"
        title="다크모드"
        :class="[
          'theme',
          slideshowState.theme === 'light' && 'light',
          slideshowState.theme === 'dark' && 'dark',
        ]"
        @click.stop="onClickTheme">
        <Icon name="sun" class="icon"/>
        <Icon name="moon" class="icon"/>
      </button>
    </li>
    <li>
      <button
        type="button"
        title="설정"
        class="setting"
        @click.stop="onClickSetting">
        <Icon name="cog"/>
      </button>
    </li>
    <li>
      <a
        href="https://github.com/redgoose-dev/slideshow"
        target="_blank"
        class="github"
        @click.stop>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
      </a>
    </li>
  </ul>
</nav>
</template>

<script setup>
import { computed } from 'vue'
import { stateStore, preferenceStore } from '../stores.js'
import Icon from '../../slideshow/components/icon/index.vue'

const slideshowState = stateStore()
const preference = preferenceStore()
const emits = defineEmits([ 'change-mode' ])

const visibleAutoplay = computed(() => {
  return preference.data?.slides?.autoplay
})

function onClickAutoplay()
{
  slideshowState.autoplay = !slideshowState.autoplay
}
function onClickTheme()
{
  slideshowState.changeTheme(slideshowState.theme === 'dark' ? 'light' : 'dark')
}
function onClickSetting()
{
  emits('change-mode', 'settings')
}
</script>

<style src="./navigation.scss" lang="scss" scoped></style>
