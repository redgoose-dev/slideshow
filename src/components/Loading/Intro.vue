<template>
<div class="loading-intro loading-intro--move">
  <template v-if="state.show">
    <LoadingUnit class="unit"/>
    <strong>{{t('title.loading')}}</strong>
  </template>
</div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue';
import i18n from '~/i18n';
import * as util from '~/libs/util';
import LoadingUnit from './Unit.vue';

const { t } = i18n.global;
let state = reactive({ show: false });
let mounted = false;

// lifecycles
onMounted(() => {
  mounted = true;
  util.sleep(50).then(() => {
    if (mounted) state.show = true;
  });
});
onUnmounted(() => {
  mounted = false;
});
</script>

<style lang="scss" scoped>
@use '../../assets/scss/mixins';
.loading-intro {
  --loading-size: 50px;
  --loading-speed: 500ms;
  width: 100vw;
  @include mixins.full-height();
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  strong {
    display: block;
    margin: 42px 0 0;
    font-size: 20px;
    font-weight: 200;
  }
  &--move {
    .unit {
      animation: loader 5000ms linear infinite;
      @keyframes loader {
        0% { left: -28vw; }
        100% { left: 28vw; }
      }
    }
  }
  @include mixins.responsive(desktop) {
    strong {
      margin: 48px 0 0;
      font-size: 24px;
    }
    &--move {
      .unit {
        @keyframes loader {
          0% { left: -12vw; }
          100% { left: 12vw; }
        }
      }
    }
  }
}
</style>
