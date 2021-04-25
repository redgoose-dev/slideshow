<template>
<div
  :class="[
    'slideshow-images',
    !animationType && `slideshow-images--none`,
    animationType === 'fade' && `slideshow-images--fade`,
    animationType === 'horizontal' && `slideshow-images--horizontal`,
    styleType && `slideshow-images--${styleType}`,
    state.animated && 'animated',
  ]"
  :style="{
    '--speed-slide-animation': `${duration}ms`,
    '--image-size': imageSize,
    '--active-column': state.active,
  }"
  @touchstart="onTouchStart"
  @touchmove="onTouchMove"
  @touchend="onTouchEnd"
  @mousedown="onTouchStart"
  @mousemove="onTouchMove"
  @mouseup="onTouchEnd">
  <div ref="wrap" class="wrap">
    <figure
      v-for="(item, key) in items"
      :ref="el => { figures[key] = el }"
      :class="[
        (state.active === key && !!state.activeClassName) && state.activeClassName,
        (state.animate === key && !!state.animateClassName) && state.animateClassName,
      ]">
      <img v-if="state.loaded[key]" :src="item.src" :alt="item.title">
      <LoadingUnit v-else class="loading"/>
    </figure>
  </div>
  <i class="overlay"/>
</div>
</template>

<script>
import { defineComponent, ref, reactive, computed } from 'vue';
import LoadingUnit from '~/components/Loading/Unit';
import * as util from '~/libs/util';

export default defineComponent({
  name: 'SlidesImages',
  components: {
    LoadingUnit,
  },
  props: {
    initialActive: { type: Number, default: 0 },
    animationType: { type: String, default: null }, // null,'fade','horizontal'
    styleType: { type: String, default: null }, // null,contain,cover
    items: { type: Array, required: true },
    duration: { type: Number, default: 800 }, // ms
    imageSize: { type: String, default: '100%' },
    loop: { type: Boolean },
  },
  setup(props, context)
  {
    let state = reactive({
      loaded: new Array(props.items.length).fill(false),
      active: props.initialActive,
      activeClassName: 'current',
      animate: undefined,
      animateClassName: undefined,
      animated: false,
    });
    let _active = props.initialActive;
    const figures = ref([]);
    const wrap = ref(null);
    let targetElement = null;
    let move = false;

    // set loaded
    state.loaded[props.initialActive] = true;
    if (props.animationType === 'horizontal')
    {
      state.loaded = util.setAreaTrue(state.loaded, props.items.length, props.initialActive, props.loop);
    }

    // methods
    async function play(n = null)
    {
      if (typeof n !== 'number') return;
      removeTransitionEndEvent();
      // set temp active
      _active = Number(n);
      // init image load event
      if (!state.loaded[_active])
      {
        const image = new Image();
        image.onload = () => {
          state.loaded[_active] = true;
        };
        image.src = props.items[_active].src;
      }
      // play motion
      switch (props.animationType)
      {
        case 'fade':
          context.emit('animation-control', true);
          state.animated = true;
          state.activeClassName = 'current ready';
          state.animate = _active;
          state.animateClassName = 'next ready';
          await util.sleep(20);
          state.animateClassName = 'next';
          targetElement = figures.value[_active];
          targetElement.addEventListener('transitionend', onTransitionEnd);
          break;
        case 'horizontal':
          context.emit('animation-control', true);
          state.animated = true;
          state.active = _active;
          wrap.value.addEventListener('transitionend', onTransitionEnd);
          // TODO: 현재 슬라이드는 `loop=true` 상태에서 첫번째와 마지막 슬라이드에서 문제가 생긴다.
          // TODO: 마지막에서 첫번째로 넘어갈 수 없는 현상이 일어난다.
          // TODO: 다른 슬라이드를 분석해보니 첫번째 이전에는 마지막 아이템, 마지막은 첫번째 아이템을 복제해놓고 애니메이션이 가능하도록 대비를 한다.
          // TODO: 애니메이션이 끝나면 위치값을 고쳐서 마지막은 첫번째로 첫번째는 마지막으로 이동할 수 있도록 조정작업을 해주면 될거같다.
          // TODO: 첫번째 아이템은 `0-100vw`, 마지막 아이템은 `last+100vw` 으로 복제물을 배치한다.
          // TODO: 영역을 넘어선 상태로 배치하기 부담스러우면 그대로 늘려놓고 `key`값을 보정하여 순서를 밀어서 대처할 수 있을것이다.
          break;
        default:
          state.active = _active;
          break;
      }
    }
    function onTransitionEnd()
    {
      switch (props.animationType)
      {
        case 'fade':
          state.animate = undefined;
          state.animateClassName = undefined;
          state.active = _active;
          state.activeClassName = 'current';
          break;
        case 'horizontal':
          state.active = _active;
          state.activeClassName = 'current';
          state.loaded = util.setAreaTrue(state.loaded, props.items.length, props.initialActive, props.loop);
          break;
      }
      state.animated = false;
      context.emit('animation-control', false);
      removeTransitionEndEvent();
    }
    function removeTransitionEndEvent()
    {
      if (!targetElement) return;
      targetElement.removeEventListener('transitionend', onTransitionEnd);
      targetElement = null;
    }
    function onTouchStart(e)
    {
      if (props.animationType !== 'horizontal') return;
      move = true;
      // console.log('onTouchStart');
    }
    function onTouchMove(e)
    {
      if (!move) return;
      // console.log('onTouchMove');
    }
    function onTouchEnd(e)
    {
      if (!move) return;
      move = false;
      // console.log('onTouchEnd');
      // TODO: context.emit('change-active')
    }

    return {
      state,
      figures,
      wrap,
      play,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };
  },
  emits: {
    'animation-control': null,
    'change-active': null,
  },
});
</script>

<style src="./Images.scss" lang="scss" scoped></style>
