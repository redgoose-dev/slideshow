<template>
<div
  :class="[
    'slideshow-images',
    state.computedAnimationTypeClass,
    imageType && `type--${imageType}`,
    state.playAnimation && 'play-animation',
    state.cancelAnimation && 'cancel-animation',
  ]"
  :style="state.computedContainerStyle">
  <div ref="wrap" class="wrap">
    <figure v-if="state.computedShowFirstItem" class="first">
      <img v-if="state.loaded[items.length-1]" :src="items[items.length-1].src" :alt="items[items.length-1].title">
    </figure>
    <figure
      v-for="(item, key) in items"
      :ref="el => { figures[key] = el }"
      :class="[
        (state.active === key && !!state.activeClassName) && state.activeClassName,
        (state.nextKey === key && !!state.nextClassName) && state.nextClassName,
      ]">
      <img v-if="state.loaded[key]" :src="item.src" :alt="item.title">
    </figure>
    <figure v-if="state.computedShowLastItem" class="last">
      <img v-if="state.loaded[0]" :src="items[0].src" :alt="items[0].title">
    </figure>
  </div>
  <i class="overlay"/>
</div>
</template>

<script>
import { defineComponent, ref, reactive, computed } from 'vue';
import * as util from '~/libs/util';
import LoadingUnit from '~/components/Loading/Unit';

export default defineComponent({
  name: 'SlidesImages',
  components: {
    LoadingUnit,
  },
  props: {
    items: { type: Array, required: true }, // 슬라이드 아이템 목록
    initialActive: { type: Number, default: 0 }, // 초기 활성화되는 슬라이드
    animationType: { type: String, default: null }, // null,'fade','horizontal'
    imageType: { type: String, default: null }, // null,contain,cover
    duration: { type: Number, default: 800 }, // animation speed(ms)
    imageSize: { type: Number, default: 100 }, // slide image scale(%)
    loop: { type: Boolean }, // slide loop
    movePos: { type: Number, default: undefined },
  },
  setup(props, context)
  {
    let state = reactive({
      loaded: new Array(props.items.length).fill(false), // 이미지 로드체크 목록
      active: props.initialActive, // 현재 활성화되어있는 슬라이드 번호
      activeClassName: 'current',
      nextKey: undefined,
      nextClassName: undefined,
      playAnimation: false,
      cancelAnimation: false,
      computedAnimationTypeClass: computed(() => {
        switch (props.animationType)
        {
          case 'fade':
            return 'animation--fade';
          case 'horizontal':
            return 'animation--horizontal';
          default:
            return 'animation--none';
        }
      }),
      computedContainerStyle: computed(() => {
        let result = {
          '--speed-slide-animation': `${props.duration}ms`,
          '--image-size': `${props.imageSize}%`,
        };
        if (props.animationType === 'horizontal')
        {
          result[`--active-column`] = (state.nextKey !== undefined) ? state.nextKey : state.active;
          if (props.movePos !== undefined)
          {
            result['--move-pos'] = `${props.movePos}vw`;
          }
        }
        return result;
      }),
      computedShowFirstItem: computed(() => {
        if (!props.loop) return false;
        return props.items[props.items.length-1] && props.animationType === 'horizontal';
      }),
      computedShowLastItem: computed(() => {
        if (!props.loop) return false;
        return props.items[0] && props.animationType === 'horizontal';
      }),
    });
    let _active = props.initialActive;
    const figures = ref([]);
    const wrap = ref(null);
    let targetElement = null;

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
          state.playAnimation = true;
          state.activeClassName = 'fadeout ready';
          state.nextKey = _active;
          state.nextClassName = 'fadein ready';
          await util.sleep(20);
          state.nextClassName = 'fadein';
          targetElement = figures.value[_active];
          targetElement.addEventListener('transitionend', onTransitionEnd);
          break;
        case 'horizontal':
          context.emit('animation-control', true);
          state.playAnimation = true;
          if (props.loop)
          {
            if (state.active === 0 && _active >= props.items.length - 1)
            {
              state.nextKey = -1;
            }
            else if (state.active >= props.items.length - 1 && _active === 0)
            {
              state.nextKey = props.items.length;
            }
            state.active = _active;
          }
          else
          {
            state.active = _active;
          }
          wrap.value.addEventListener('transitionend', onTransitionEnd);
          break;
        default:
          state.active = _active;
          break;
      }
    }
    async function cancel()
    {
      if (state.playAnimation) return;
      context.emit('animation-control', true);
      state.cancelAnimation = true;
      wrap.value.addEventListener('transitionend', onCancelTransitionEnd);
    }
    function onTransitionEnd()
    {
      switch (props.animationType)
      {
        case 'fade':
          state.playAnimation = false;
          state.nextKey = undefined;
          state.nextClassName = undefined;
          state.active = _active;
          state.activeClassName = 'current';
          removeTransitionEndEvent();
          context.emit('animation-control', false);
          break;
        case 'horizontal':
          state.playAnimation = false;
          state.nextKey = undefined;
          state.loaded = util.setAreaTrue(state.loaded, props.items.length, props.initialActive, props.loop);
          context.emit('animation-control', false);
          break;
      }
    }
    function onCancelTransitionEnd()
    {
      state.cancelAnimation = false;
      context.emit('animation-control', false);
    }
    function removeTransitionEndEvent()
    {
      if (!targetElement) return;
      targetElement.removeEventListener('transitionend', onTransitionEnd);
      targetElement = null;
    }

    return {
      state,
      figures,
      wrap,
      play,
      cancel,
    };
  },
  emits: {
    'animation-control': null,
    'change-active': null,
  },
});
</script>

<style src="./Images.scss" lang="scss" scoped></style>
