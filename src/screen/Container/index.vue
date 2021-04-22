<template>
<div class="slideshow">
  <Slides class="slideshow__slides"/>
  <Thumbnail
    v-if="state.mode === 'thumbnail'"
    class="slideshow__thumbnail"/>
  <Navigation
    class="slideshow__navigation"/>
  <teleport to="#preference">
    <Preference
      v-if="state.mode === 'preference'"
      class="slideshow__preference"/>
  </teleport>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import Thumbnail from '~/screen/Thumbnail/index.vue';
import Preference from '~/screen/Preference/index.vue';
import Navigation from '~/components/Navigation/index.vue';
import Slides from '~/components/Slides/index.vue';

export default defineComponent({
  name: 'Container',
  components: {
    Slides,
    Thumbnail,
    Navigation,
    Preference,
  },
  setup()
  {
    const store = useStore();
    let state = reactive({
      mode: computed(() => {
        switch (store.state.mode)
        {
          case 'preference':
          case 'thumbnail':
            return store.state.mode;
          default:
            return null;
        }
      }),
    });
    return {
      state,
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
  }
  &__navigation {
    position: fixed;
    z-index: 4;
    right: 0;
    top: 0;
  }
  &__preference {
    position: fixed;
    z-index: 5;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  @include responsive(desktop) {
    &__navigation {
      right: 30px;
      top: 30px;
    }
  }
  @include dark-mode() {}
}
</style>
