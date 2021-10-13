<template>
<div
  :class="[
    'slideshow-images',
    `animation--${animationType}`,
    imageType && `type--${imageType}`,
    state.playAnimation && 'play-animation',
    state.cancelAnimation && 'cancel-animation',
  ]"
  :style="state.computedContainerStyle">
  <div ref="wrap" class="wrap">
    <figure
      v-if="state.computedShowFirstItem"
      class="first">
      <img
        v-if="state.loaded[items.length-1]"
        :src="items[items.length-1].src"
        :alt="items[items.length-1].title">
    </figure>
    <figure
      v-for="(item, key) in items"
      :ref="el => { figures[key] = el }"
      :class="[
        (state.active === key && !!state.activeClassName) && state.activeClassName,
        (state.nextKey === key && !!state.nextClassName) && state.nextClassName,
      ]">
      <div v-if="state.error[key]" class="empty-image">
        <Icon icon-name="x"/>
        <strong>no image</strong>
      </div>
      <img
        v-else-if="state.loaded[key]"
        :src="item.src"
        :alt="item.title"
        @error="onErrorImage(key)">
    </figure>
    <figure
      v-if="state.computedShowLastItem"
      class="last">
      <img
        v-if="state.loaded[0]"
        :src="items[0].src"
        :alt="items[0].title">
    </figure>
  </div>
  <i class="overlay"/>
</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import * as util from '~/libs/util';
import Icon from '~/components/Icon/index.vue';

const name = 'SlidesImages';
const props = defineProps({
  items: { type: Array, required: true }, // 슬라이드 아이템 목록
  initialActive: { type: Number, default: 0 }, // 초기 활성화되는 슬라이드
  animationType: { type: String, default: 'none' }, // fade,horizontal,none
  imageType: { type: String, default: null }, // null,contain,cover
  duration: { type: Number, default: 800 }, // animation speed(ms)
  imageSize: { type: Array, default: [100,100] }, // slide image scale(%)
  loop: { type: Boolean }, // slide loop
  movePos: { type: Number, default: undefined },
});
const emits = defineEmits({
  'animation-control': null,
  'change-active': null,
});
let state = reactive({
  loaded: new Array(props.items.length).fill(false), // 이미지 로드체크 목록
  error: new Array(props.items.length).fill(false), // 이미지 에러체크 목록
  active: props.initialActive, // 현재 활성화되어있는 슬라이드 번호
  activeClassName: 'current',
  nextKey: undefined,
  nextClassName: undefined,
  playAnimation: false,
  cancelAnimation: false,
  computedContainerStyle: computed(() => {
    let result = {
      '--speed-slide-animation': `${props.duration}ms`,
      '--image-size-width': props.imageSize[0],
      '--image-size-height': props.imageSize[1],
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
    if (props.items.length <= 1) return false;
    return props.items[props.items.length-1] && props.animationType === 'horizontal';
  }),
  computedShowLastItem: computed(() => {
    if (!props.loop) return false;
    if (props.items.length <= 1) return false;
    return props.items[0] && props.animationType === 'horizontal';
  }),
});
let _active = props.initialActive;
const figures = ref([]);
const wrap = ref(null);
let targetElement = null;

// set loaded
state.loaded[props.initialActive] = true;
state.loaded = util.setAreaTrue(state.loaded, props.items.length, props.initialActive, props.loop);

// methods
async function play(n = null, userAnimationType = undefined)
{
  if (typeof n !== 'number') return;
  // set temp active
  _active = Number(n);
  // play motion
  const type = userAnimationType !== undefined ? userAnimationType : props.animationType;
  // check loaded image
  if (!state.loaded[_active])
  {
    try
    {
      await checkLoadImage(props.items[_active].src);
      state.loaded[_active] = true;
    }
    catch(e)
    {
      state.error[_active] = true;
    }
  }
  // play transition
  switch (type)
  {
    case 'fade':
      if (targetElement)
      {
        targetElement.removeEventListener('transitionend', onTransitionEnd);
        targetElement = null;
      }
      emits('animation-control', true);
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
      emits('animation-control', true);
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
    case 'none':
    default:
      state.active = _active;
      state.loaded = util.setAreaTrue(state.loaded, props.items.length, props.initialActive, props.loop);
      break;
  }
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
      state.loaded = util.setAreaTrue(state.loaded, props.items.length, props.initialActive, props.loop);
      if (targetElement)
      {
        targetElement.removeEventListener('transitionend', onTransitionEnd);
        targetElement = null;
      }
      emits('animation-control', false);
      break;
    case 'horizontal':
      state.playAnimation = false;
      state.nextKey = undefined;
      state.loaded = util.setAreaTrue(state.loaded, props.items.length, props.initialActive, props.loop);
      wrap.value.removeEventListener('transitionend', onTransitionEnd);
      emits('animation-control', false);
      break;
  }
}
async function cancel()
{
  if (state.playAnimation) return;
  emits('animation-control', true);
  state.cancelAnimation = true;
  wrap.value.addEventListener('transitionend', onCancelTransitionEnd);
}
function onCancelTransitionEnd()
{
  state.cancelAnimation = false;
  wrap.value.removeEventListener('transitionend', onCancelTransitionEnd);
  emits('animation-control', false);
}
function onErrorImage(key)
{
  state.error[key] = true;
}
function checkLoadImage(src)
{
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject();
    image.src = src;
  });
}

// set expose
defineExpose({
  play,
  cancel,
});
</script>

<style src="./Images.scss" lang="scss" scoped></style>
