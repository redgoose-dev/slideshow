<template>
<article class="guide">
  <header class="guide__header">
    <h2>Slideshow guide</h2>
    <p>슬라이드쇼에 관한 가이드입니다.</p>
    <ButtonClose
      :title="$t('base.close')"
      class="guide__close"
      @click="onClose"/>
  </header>
  <section>
    .section
  </section>
</article>
</template>

<script>
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import * as local from '~/libs/local';
import ButtonClose from '~/components/Button/Close';

export default defineComponent({
  name: 'Guide',
  components: {
    ButtonClose,
  },
  setup()
  {
    const store = useStore();

    // methods
    function onClose()
    {
      store.dispatch('changeMode', null);
    }

    // lifecycles
    onMounted(() => {
      if (local.slides) local.slides.pause(true);
    });
    onUnmounted(() => {
      if (local.slides) local.slides.pause(false);
    });

    return {
      onClose,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
