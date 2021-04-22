<template>
<div class="container">
  <Slides/>
  <Thumbnail v-if="state.mode === 'thumbnail'"/>
  <Navigation class="container__navigation"/>
  <teleport to="#preference">
    <Preference v-if="state.mode === 'preference'"/>
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
.container {
  &__navigation {
    position: fixed;
    z-index: 2;
    right: 30px;
    top: 30px;
  }
  @include dark-mode() {
    //background: lime;
  }
}
</style>
