<template>
<div class="slideshow">
  <Slides
    v-if="state.existSlideItem"
    ref="slides"
    class="slideshow__slides"/>
  <SlidesEmpty v-else/>
  <Thumbnail
    v-if="state.computedShowThumbnail"
    class="slideshow__thumbnail"/>
  <Navigation class="slideshow__navigation"/>
  <teleport to="#preference">
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
        return store.state.preference.general.visibleContents.thumbnail && state.computedMode === 'thumbnail';
      }),
      computedShowPreference: computed(() => {
        return state.computedMode === 'preference';
      }),
    });
    const slides = ref(null);

    // lifecycles
    onMounted(() => {
      local.setupSlides(slides.value);
      // TODO: 키보드 이벤트 켜기
    });
    onUnmounted(() => {
      // TODO: 키보드 이벤트 끄기
      console.warn('unmounted on Container component')
    });

    return {
      state,
      slides,
    };
  },
});
</script>

<style lang="scss">
@import '../../scss/mixins';
.slideshow {
  &__slides {
    position: relative;
  }
  &__thumbnail {
    position: fixed;
    z-index: 3;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: var(--color-bg);
  }
  &__navigation {
    position: fixed;
    z-index: 4;
    top: 12px;
    right: 12px;
  }
  &__preference {
    position: fixed;
    z-index: 5;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  @include responsive(tablet)
  {
    &__navigation {
      top: 16px;
      right: 16px;
    }
  }
  @include responsive(desktop) {
    &__navigation {
      top: 30px;
      right: 30px;
    }
  }
  @include dark-mode() {}
}
</style>
