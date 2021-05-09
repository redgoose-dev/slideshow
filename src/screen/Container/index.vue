<template>
<div
  :class="[
    'slideshow',
    $store.state.preference.general.hoverVisibleHud && 'slideshow--hover',
  ]">
  <Slides
    v-if="state.existSlideItem"
    ref="slides"
    class="slideshow__slides"/>
  <SlidesEmpty v-else/>
  <Navigation
    v-if="$store.state.preference.general.hud"
    class="slideshow__navigation"/>
  <teleport to="#modal">
    <Thumbnail v-if="state.computedShowThumbnail"/>
    <Preference
      v-if="state.computedShowPreference"
      class="slideshow__preference"/>
  </teleport>
</div>
</template>

<script>
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import * as local from '~/libs/local';
import Thumbnail from '~/screen/Thumbnail';
import Preference from '~/screen/Preference';
import Navigation from '~/components/Navigation';
import Slides from '~/components/Slides';
import SlidesEmpty from '~/components/Slides/Empty';

export default defineComponent({
  name: 'Container',
  components: {
    Slides,
    SlidesEmpty,
    Thumbnail,
    Navigation,
    Preference,
  },
  setup()
  {
    const store = useStore();
    let state = reactive({
      existSlideItem: store.state.slides.length > 0,
      computedMode: computed(() => {
        switch (store.state.mode)
        {
          case 'preference':
          case 'thumbnail':
            return store.state.mode;
          default:
            return null;
        }
      }),
      computedShowThumbnail: computed(() => {
        return store.state.preference.general.visibleHudContents.thumbnail && state.computedMode === 'thumbnail';
      }),
      computedShowPreference: computed(() => {
        return state.computedMode === 'preference';
      }),
    });
    const slides = ref(null);
    let keys = [];

    // methods
    function onKeyup(e)
    {
      if (!store.state.keyboardEvent) return;
      const keyName = e.key.toLowerCase();
      if (keys.length > 1)
      {
        const idx = keys.indexOf(keyName);
        if (idx > -1) keys.splice(idx);
      }
      else
      {
        switch (keyName)
        {
          case 'arrowleft':
            local.slides.prev();
            break;
          case 'arrowright':
            local.slides.next();
            break;
          case 'a':
            local.slides.autoplay(!store.state.preference.slides.autoplay);
            break;
          case 's':
            store.commit('changeMode', store.state.mode === 'preference' ? null : 'preference');
            break;
          case 't':
            store.commit('changeMode', store.state.mode === 'thumbnail' ? null : 'thumbnail');
            break;
          case 'r':
            local.main.restart();
            break;
          case 'h':
            store.commit('toggleHud');
            break;
        }
        keys = [];
      }
    }
    function onKeydown(e)
    {
      if (!store.state.keyboardEvent) return;
      const keyName = e.key.toLowerCase();
      if (keys.indexOf(keyName) > -1) return;
      keys.push(keyName);
    }

    // lifecycles
    onMounted(() => {
      // setup slides
      local.setupSlides(slides.value);
      // on keyboard event
      if (store.state.preference.keyboard.enabled)
      {
        window.on('keyup.slideshow-keyboard', onKeyup);
        window.on('keydown.slideshow-keyboard', onKeydown);
      }
    });
    onUnmounted(() => {
      // off keyboard event
      if (store.state.preference.keyboard.enabled)
      {
        window.off('keyup.slideshow-keyboard');
        window.off('keydown.slideshow-keyboard');
      }
    });

    return {
      state,
      slides,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
