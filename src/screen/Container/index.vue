<template>
<div :class="[
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
    <Preference v-if="state.computedShowPreference"/>
  </teleport>
</div>
</template>

<script>
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n/index';
import * as local from '~/libs/local';
import Navigation from '~/components/Navigation';
import Slides from '~/components/Slides';
import SlidesEmpty from '~/components/Slides/Empty';
import Thumbnail from '~/screen/Thumbnail';
import Preference from '~/screen/Preference';

export default defineComponent({
  name: 'Container',
  components: {
    Navigation,
    Slides,
    SlidesEmpty,
    Thumbnail,
    Preference,
  },
  setup()
  {
    const store = useStore();
    const { t } = useI18n({ useScope: 'global' });
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
      if (keys.length > 1)
      {
        const idx = keys.indexOf(e.keyCode);
        if (idx > -1) keys.splice(idx);
        return;
      }
      if (state.computedMode)
      {
        switch (e.keyCode)
        {
          case 27: // esc
            store.dispatch('changeMode', null);
            break;
        }
      }
      else
      {
        switch (e.keyCode)
        {
          case 37: // arrow left
            local.slides.prev();
            break;
          case 39: // arrow right
            local.slides.next();
            break;
          case 65: // a
            local.slides.autoplay(!store.state.preference.slides.autoplay);
            break;
          case 83: // s
            store.dispatch('changeMode', 'preference');
            break;
          case 84: // t
            store.dispatch('changeMode', 'thumbnail');
            break;
          case 82: // r
            if (!confirm(t('main.confirmRestart'))) return;
            local.main.restart();
            break;
          case 72: // h
            store.dispatch('changeHud');
            break;
        }
      }
      keys = [];
    }
    function onKeydown(e)
    {
      if (!store.state.keyboardEvent) return;
      if (keys.indexOf(e.keyCode) > -1) return;
      keys.push(e.keyCode);
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
