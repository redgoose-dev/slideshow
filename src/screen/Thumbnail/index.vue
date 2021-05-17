<template>
<article
  class="thumbnail"
  @touchstart="onTouchStart">
  <header class="thumbnail__header">
    <h2>
      {{$store.state.preference.general.name}}
    </h2>
    <p v-html="state.computedDescription"/>
    <ButtonClose
      :title="$t('base.close')"
      class="thumbnail__close"
      @click="onClose"/>
  </header>
  <div class="thumbnail__body">
    <ul
      v-if="state.computedIndex && state.computedIndex.length > 0"
      class="thumbnail__index">
      <li v-for="(o,k) in state.computedIndex">
        <button
          type="button"
          :disabled="k === $store.state.activeSlide"
          @click="onSelect(k)">
          <img :src="o.thumbnail" :alt="o.title">
        </button>
      </li>
    </ul>
    <div v-else class="thumbnail__empty">
      <Icon icon-name="frown"/>
      <p>{{$t('thumbnail.empty')}}</p>
    </div>
  </div>
</article>
</template>

<script>
import { defineComponent, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import * as local from '~/libs/local';
import ButtonClose from '~/components/Button/Close';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'Thumbnail',
  components: {
    ButtonClose,
    Icon,
  },
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
      computedDescription: computed(() => {
        return store.state.preference.general.description.replaceAll('\n', '<br/>');
      }),
    });

    // methods
    function onSelect(n)
    {
      if (local.slides) local.slides.change(n, 'none');
      store.dispatch('changeMode', null);
    }
    function onClose()
    {
      store.dispatch('changeMode', null);
    }
    function onTouchStart(e)
    {
      if (e.touches && e.touches.length > 1) e.preventDefault();
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
      onClose,
      onTouchStart,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
