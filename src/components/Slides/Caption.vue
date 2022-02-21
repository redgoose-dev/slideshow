<template>
<article
  class="slideshow-caption"
  :style="{
    '--caption-position-left': position[0],
    '--caption-position-top': position[1],
    '--caption-scale': scale,
  }">
  <template v-if="animationType === 'shuffle'">
    <h1 v-if="title" ref="elementTitle"></h1>
    <pre v-if="description" ref="elementDescription"></pre>
  </template>
  <template v-else>
    <h1 v-if="title">{{title}}</h1>
    <pre v-if="description">{{description}}</pre>
  </template>
</article>
</template>

<script setup>
import { watch, reactive, computed, onMounted, ref } from 'vue';
import shuffle from '../../libs/shuffle';

const name = 'Caption';
const props = defineProps({
  active: { type: Number, required: true },
  title: { type: String, default: 'Untitled' },
  description: { type: String, default: null },
  animationType: { type: String, default: null }, // null,shuffle
  animationSpeed: { type: Number, default: 40 }, // shuffle(fps)
  position: { type: Array, default: [] }, // [left,top]
  scale: { type: Number, default: 100 },
});
const elementTitle = ref(null);
const elementDescription = ref(null);
let state = reactive({
  computedRealText: computed(() => {
    switch (props.animationType)
    {
      case 'shuffle':
        return false;
      default:
        return true;
    }
  }),
});
let interval = undefined;

// methods
function playTransition(type)
{
  switch (type)
  {
    case 'shuffle':
      clearTimer();
      if (elementDescription.value.dataset.id)
      {
        clearInterval(Number(elementDescription.value.dataset.id));
        elementDescription.value.innerText = '';
      }
      if (props.title)
      {
        shuffle(elementTitle.value, {
          text: props.title,
          fps: props.animationSpeed,
          randomTextType: 'pattern',
        });
      }
      if (props.description)
      {
        interval = setTimeout(() => {
          clearTimer();
          shuffle(elementDescription.value, {
            text: props.description,
            fps: props.animationSpeed,
          });
        }, 300);
      }
      break;
  }
}
function clearTimer()
{
  if (!interval) return;
  clearTimeout(interval);
  interval = undefined;
}

// switch animation type
switch (props.animationType)
{
  case 'shuffle':
    onMounted(() => setTimeout(() => playTransition('shuffle'), 100));
    watch(() => props.active, () => playTransition('shuffle'));
    break;
}
</script>

<style src="./Caption.scss" lang="scss" scoped></style>
