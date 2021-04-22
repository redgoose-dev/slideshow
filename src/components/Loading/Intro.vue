<template>
<div class="loading-intro loading-intro--move">
  <template v-if="state.show">
    <p>
      <span/>
      <em/>
    </p>
    <strong>{{$t('loading.label')}}</strong>
  </template>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, onUnmounted } from 'vue';
import * as util from '~/libs/util';

export default defineComponent({
  name: 'LoadingIntro',
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
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  // wrapper
  p {
    position: relative;
    margin: 0;
    width: var(--loading-size);
    height: var(--loading-size);
    box-sizing: border-box;
  }
  // box
  em {
    display: block;
    font-style: normal;
    width: var(--loading-size);
    height: var(--loading-size);
    background-color: var(--color-key);
    animation: animate var(--loading-speed) linear infinite;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;

    @keyframes animate {
      17% { border-bottom-right-radius: 3px; }
      25% { transform: translateY(9px) rotate(22.5deg); }
      50% {
        transform: translateY(18px) scale(1,.9) rotate(45deg);
        border-bottom-right-radius: 40px;
      }
      75% { transform: translateY(9px) rotate(67.5deg); }
      100% { transform: translateY(0) rotate(90deg); }
    }
  }
  // shadow
  span {
    display: block;
    width: var(--loading-size);
    height: 5px;
    background-color: rgba(0,0,0,.25);
    position: absolute;
    top: calc(var(--loading-size) + 9px);
    left: 0;
    border-radius: 50%;
    animation: shadow var(--loading-speed) linear infinite;
    @keyframes shadow {
      50% {
        transform: scale(1.2, 1);
      }
    }
  }
  // label
  strong {
    display: block;
    margin: 32px 0 0;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -.5px;
  }
  &--move {
    p {
      animation: loader 5000ms linear infinite;
      @keyframes loader {
        0% { left: -28vw; }
        100% { left: 28vw; }
      }
    }
  }
  @include responsive(desktop) {
    strong {
      margin: 42px 0 0;
      font-size: 24px;
    }
    &--move {
      p {
        @keyframes loader {
          0% { left: -12vw; }
          100% { left: 12vw; }
        }
      }
    }
  }
}
</style>
