<template>
<article class="thumbnail" @touchstart="onTouchStart">
  <header v-if="computes.title" class="thumbnail__header">
    <h2>{{computes.title}}</h2>
    <p v-if="computes.description">{{computes.description}}</p>
  </header>
  <div class="thumbnail__body">
    <ul
      v-if="computes.index && computes.index.length > 0"
      class="thumbnail__index">
      <li v-for="(o,k) in computes.index">
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
  <ButtonClose
    :title="$t('base.close')"
    class="thumbnail__close"
    @click="onClose"/>
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
    let computes = reactive({
      index: computed(() => {
        return store.state.slides.map(o => ({
          ...o,
          thumbnail: o.thumbnail || o.src,
        }));
      }),
      title: computed(() => {
        return store.state.tree[store.state.group].name;
      }),
      description: computed(() => {
        return store.state.tree[store.state.group].description;
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
      computes,
      onSelect,
      onClose,
      onTouchStart,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
