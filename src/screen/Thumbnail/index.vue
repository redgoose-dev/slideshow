<template>
<article class="thumbnail">
  <header class="thumbnail__header">
    <h2>{{$store.state.preference.general.name}}</h2>
    <p>{{$store.state.preference.general.description}}</p>
  </header>
  <div class="thumbnail__body">
    <ul class="thumbnail__index">
      <li v-for="(o,k) in state.computedIndex">
        <button
          type="button"
          :disabled="k === $store.state.activeSlide"
          @click="onSelect(k)">
          <img :src="o.thumbnail" :alt="o.title">
        </button>
      </li>
    </ul>
  </div>
</article>
</template>

<script>
import { defineComponent, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import * as local from '~/libs/local';

export default defineComponent({
  name: 'Thumbnail',
  setup()
  {
    const store = useStore();
    let state = reactive({
      computedIndex: computed(() => {
        return store.state.slides.map(o => ({
          ...o,
          thumbnail: o.thumbnail || o.src,
        }));
      }),
    });

    // methods
    function onSelect(n)
    {
      local.slides.change(n, 'none');
      store.commit('changeMode', null);
    }

    // lifecycles
    onMounted(() => {
      if (local.slides) local.slides.pause(true);
    });
    onUnmounted(() => {
      if (local.slides) local.slides.pause(false);
    });

    return {
      state,
      onSelect,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
