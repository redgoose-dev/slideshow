<template>
<article class="error">
  <Icon name="skull"/>
  <h1>Error</h1>
  <p>{{props.message}}</p>
</article>
</template>

<script setup>
import Icon from '../icon/index.vue'

const props = defineProps({
  message: String,
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
  padding: 0 24px 36px;
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
