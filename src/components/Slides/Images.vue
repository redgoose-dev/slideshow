<template>
<div
  :class="[
    'slideshow-images',
    animationType === 'fade' && `slideshow-images--fade`,
    animationType === 'horizontal' && `slideshow-images--horizontal`,
    styleType && `slideshow-images--${styleType}`,
  ]"
  :style="{
    '--speed-slide-animation': `${duration}ms`,
    '--image-size': imageSize,
  }"
  @touchstart="onTouchStart"
  @touchmove="onTouchMove"
  @touchend="onTouchEnd"
  @mousedown="onTouchStart"
  @mousemove="onTouchMove"
  @mouseup="onTouchEnd">
  <figure
    v-for="(item, key) in items"
    :ref="el => { figures[key] = el }"
    :class="[
      (state.activeKey === key && !!state.activeClassName) && state.activeClassName,
      (state.animateKey === key && !!state.animateClassName) && state.animateClassName,
    ]">
    <img v-if="state.loaded[key]" :src="item.src" :alt="item.title">
    <LoadingUnit v-else class="loading"/>
  </figure>
  <i class="overlay"/>
</div>
</template>

<script>
import { defineComponent, onMounted, ref, watch, reactive } from 'vue';
import LoadingUnit from '~/components/Loading/Unit';
import * as util from '~/libs/util';

export default defineComponent({
  name: 'SlidesImages',
  components: {
    LoadingUnit,
  },
  props: {
    animationType: { type: String, default: 'fade' }, // null,'fade','horizontal'
    styleType: { type: String, default: null }, // null,contain,cover
    items: { type: Array, required: true },
    active: { type: Number, default: 0 },
    duration: { type: Number, default: 800 }, // ms
    imageSize: { type: String, default: '100%' },
  },
  setup(props, context)
  {
    let state = reactive({
      loaded: new Array(props.items.length).fill(false),
      activeKey: props.active,
      activeClassName: 'current',
      animateKey: null,
      animateClassName: null,
    });
    const figures = ref([]);
    let targetElement = null;
    let move = false;

    // set loaded
    state.loaded[props.active] = true;

    // methods
    function play()
    {
      removeTransitionEndEvent();
      switch (props.animationType)
      {
        case 'fade':
          context.emit('animation-control', true);
          state.activeClassName = 'current current-to';
          state.animateKey = props.active;
          state.animateClassName = 'from';
          util.sleep(30).then(() => {
            state.animateClassName = 'from to';
            targetElement = figures.value[props.active];
            targetElement.addEventListener('transitionend', onTransitionEnd);
          });
          break;
        case 'horizontal':
          console.log('horizontal slide animation')
          break;
        default:
          state.activeKey = props.active;
          break;
      }
      if (!state.loaded[props.active])
      {
        const image = new Image();
        image.onload = () => {
          state.loaded[props.active] = true;
        };
        image.src = props.items[props.active].src;
      }
    }
    function onTransitionEnd()
    {
      state.animateKey = undefined;
      state.animateClassName = undefined;
      state.activeKey = props.active;
      state.activeClassName = 'current';
      context.emit('animation-control', false);
      removeTransitionEndEvent();
    }
    function removeTransitionEndEvent()
    {
      if (!targetElement) return;
      targetElement.removeEventListener('transitionend', onTransitionEnd);
      targetElement = null;
    }
    function onTouchStart()
    {
      move = true;
      // console.log('onTouchStart');
    }
    function onTouchMove()
    {
      if (!move) return;
      // console.log('onTouchMove');
    }
    function onTouchEnd()
    {
      if (!move) return;
      move = false;
      // console.log('onTouchEnd');
    }

    // watches
    watch(() => props.active, play);

    return {
      state,
      figures,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };
  },
  emits: {
    'animation-control': null,
  },
});
</script>

<style lang="scss" scoped>
.slideshow-images {
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  user-select: none;
  figure {
    display: none;
    margin: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: var(--color-bg);
    > img {
      position: absolute;
      left: 50%;
      top: 50%;
      display: block;
      transform: translate(-50%, -50%);
      max-width: var(--image-size, 100%);
      max-height: var(--image-size, 100%);
      box-sizing: border-box;
    }
    &.current {
      display: block;
    }
  }
  &--fade {
    figure {
      transition-property: opacity;
      transition-duration: var(--speed-slide-animation, 800ms);
      transition-timing-function: ease-out;
      &.from {
        display: block;
        z-index: 2;
        opacity: 0;
      }
      &.to {
        opacity: 1;
      }
      &.current {
        opacity: 1;
        z-index: 1;
        &.current-to {
          opacity: 0;
        }
      }
    }
  }
  &--horizontal {
    figure {
      transition-property: transform;
      transition-duration: var(--speed-slide-animation, 800ms);
      transition-timing-function: ease-out;
      //&.from {
      //  display: block;
      //  transform: translateX(-100%);
      //}
      //&.next {
      //  display: block;
      //  transform: translateX(100%);
      //}
    }
  }
  &--contain {
    figure {
      > img {
        width: var(--image-size, 80%);
        height: var(--image-size, 80%);
        object-fit: contain;
      }
    }
  }
  &--cover {
    figure {
      > img {
        width: var(--image-size, 80%);
        height: var(--image-size, 80%);
        object-fit: cover;
      }
    }
  }
  .overlay {
    display: block;
    position: absolute;
    z-index: 5;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: transparent;
  }
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  --loading-size: 50px;
  --loading-speed: 500ms;
}
</style>
