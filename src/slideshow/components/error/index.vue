<template>
<article class="error">
  <Icon :name="_icon"/>
  <h1>{{_title}}</h1>
  <p>{{_message}}</p>
</article>
</template>

<script setup>
import { computed } from 'vue'
import { languageStore } from '../../store/index.js'
import Icon from '../icon/index.vue'

const props = defineProps({
  message: { type: String, default: 'Invalid error' },
})
const language = languageStore()
const _title = computed(() => {
  switch (props.message)
  {
    case 'EMPTY_SLIDES':
      return language.print('error.title-empty')
    default:
      return language.print('error.title')
  }
})
const _message = computed(() => {
  switch (props.message)
  {
    case 'EMPTY_SLIDES':
      return language.print('error.empty')
    default:
      return props.message
  }
})
const _icon = computed(() => {
  switch (props.message)
  {
    case 'EMPTY_SLIDES':
      return 'ghost'
    default:
      return 'skull'
  }
})
</script>

<style lang="scss" scoped>
@use '../../assets/mixins';
.error {
  display: grid;
  place-content: center;
  justify-items: center;
  height: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 36px 24px 56px;
  .icon {
    --icon-size: 78px;
    --icon-margin: 0;
    --icon-stroke: 1.5;
    --icon-color: var(--color-danger);
  }
  h1 {
    margin: 8px 0 0;
    font-size: 36px;
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -.5px;
    user-select: none;
  }
  p {
    margin: 4px 0 0;
    display: block;
    font-size: 13px;
    line-height: 1.15;
    line-break: anywhere;
    text-align: center;
    color: var(--color-low-fill);
  }
  @include mixins.responsive(desktop) {
    .icon {
      --icon-size: 100px;
      --icon-stroke: 1.5;
    }
    h1 {
      margin-top: 16px;
      font-size: 52px;
    }
    p {
      margin-top: 8px;
      max-width: 480px;
      font-size: 16px;
    }
  }
}
</style>
