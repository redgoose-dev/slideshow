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

<script>
import { defineComponent, watch, reactive, computed, onMounted, ref } from 'vue';
import shuffle from '~/libs/shuffle';

export default defineComponent({
  name: 'Caption',
  props: {
    active: { type: Number, required: true },
    title: { type: String, default: 'Untitled' },
    description: { type: String, default: null },
    animationType: { type: String, default: null }, // null,shuffle
    animationSpeed: { type: Number, default: 40 }, // shuffle(fps)
    position: { type: Array, default: [] }, // [left,top]
    scale: { type: Number, default: 100 },
  },
  setup(props)
  {
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

    return {
      state,
      elementTitle,
      elementDescription,
    };
  },
});
</script>

<style lang="scss">
@import "../../scss/mixins";

.slideshow-caption {
  display: none;
  @include responsive(desktop) {
    --scale: calc(var(--caption-scale, 100) / 100);
    display: block;
    position: fixed;
    top: var(--caption-position-top, 32px);
    left: var(--caption-position-left, 30px);
    z-index: 2;
    pointer-events: none;
    transform: scale(var(--scale));
    transform-origin: 0 0;
    backface-visibility: hidden;
    will-change: transform;
    h1 {
      margin: 0;
      line-height: 1;
      font-size: 42px;
      letter-spacing: -1px;
      font-weight: 800;
      white-space: nowrap;
    }
    pre {
      display: block;
      margin: 4px 0 0;
      font-family: var(--font-base);
      line-height: 1.05;
      word-break: break-word;
      font-weight: 400;
      font-size: 13px;
      letter-spacing: -.25px;
      color: var(--color-low-fill);
    }
    .slideshow--hover & {
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--speed-content-toggle) ease-out;
    }
    .slideshow--hover:hover & {
      opacity: unset;
      pointer-events: unset;
    }
  }
}
</style>
