<template>
<div
  :class="[
    'slideshow',
    $store.state.preference.general.hoverVisibleHud && 'slideshow--hover',
  ]">
  <Slides
    v-if="computes.existSlides"
    ref="slides"
    class="slideshow__slides"/>
  <SlidesEmpty
    v-else
    :title="computes.emptyTitle"
    :description="computes.emptyDescription"/>
  <Navigation
    v-if="$store.state.preference.general.hud"
    ref="navigation"
    class="slideshow__navigation"/>
  <teleport to="#modal">
    <Group v-if="computes.showGroup"/>
    <Thumbnail v-if="computes.showThumbnail"/>
    <Preference v-if="computes.showPreference"/>
  </teleport>
</div>
</template>

<script>
import { defineComponent, reactive, computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n/index';
import * as local from '~/libs/local';
import Slides from '~/components/Slides';
import SlidesEmpty from '~/components/Slides/Empty';
import Navigation from '~/screen/Navigation';
import Preference from '~/screen/Preference';
import Group from '~/screen/Group';
import Thumbnail from '~/screen/Thumbnail';

export default defineComponent({
  name: 'Container',
  components: {
    Navigation,
    Slides,
    SlidesEmpty,
    Preference,
    Group,
    Thumbnail,
  },
  props: {
    error: Object,
  },
  setup(props)
  {
    const store = useStore();
    const { t } = useI18n({ useScope: 'global' });
    const slides = ref(null);
    const navigation = ref(null);
    let computes = reactive({
      mode: computed(() => {
        switch (store.state.mode)
        {
          case 'preference':
          case 'group':
          case 'thumbnail':
            return store.state.mode;
          default:
            return null;
        }
      }),
      existSlides: computed(() => {
        return store.state.slides && store.state.slides.length > 0;
      }),
      showThumbnail: computed(() => (computes.mode === 'thumbnail')),
      showPreference: computed(() => (computes.mode === 'preference')),
      showGroup: computed(() => (computes.mode === 'group')),
      emptyTitle: computed(() => {
        return props.error ? props.error.title : undefined;
      }),
      emptyDescription: computed(() => {
        return props.error ? props.error.description : undefined;
      }),
    });
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
      if (navigation.value) navigation.value.blur();
      if (computes.mode)
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
            if (local.slides) local.slides.prev();
            break;
          case 39: // arrow right
            if (local.slides) local.slides.next();
            break;
          case 65: // a
            if (local.slides && store.state.preference.slides.autoplay)
            {
              local.slides.autoplay();
            }
            break;
          case 83: // s
            store.dispatch('changeMode', 'preference');
            break;
          case 84: // t
            store.dispatch('changeMode', 'thumbnail');
            break;
          case 82: // r
            if (confirm(t('confirm.restart')) && local.main)
            {
              local.main.restart().then();
            }
            break;
          case 71: // g
            if (store.state.tree && Object.keys(store.state.tree).length > 1)
            {
              store.dispatch('changeMode', 'group');
            }
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
      else
      {
        window.off('keyup.slideshow-keyboard');
        window.off('keydown.slideshow-keyboard');
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
      computes,
      slides,
      navigation,
    };
  },
});
</script>

<style src="./Container.scss" lang="scss" scoped></style>
