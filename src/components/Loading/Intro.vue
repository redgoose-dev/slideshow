<template>
<div class="loading-intro loading-intro--move">
  <template v-if="state.show">
    <LoadingUnit class="unit"/>
    <strong>{{$t('title.loading')}}</strong>
  </template>
</div>
</template>

<script>
import { defineComponent, reactive, onMounted, onUnmounted } from 'vue';
import * as util from '~/libs/util';
import LoadingUnit from './Unit';

export default defineComponent({
  name: 'LoadingIntro',
  components: {
    LoadingUnit,
  },
  setup()
  {
    let state = reactive({
      show: false,
    });
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

    return {
      state,
    };
  },
});
</script>

<style lang="scss">
@import "../../scss/mixins";
.loading-intro {
  --loading-size: 50px;
  --loading-speed: 500ms;
  width: 100vw;
  @include full-height();
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
  @include responsive(desktop) {
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
