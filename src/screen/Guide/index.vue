<template>
<article class="guide">
  <header class="guide__header">
    <h2>Slideshow guide</h2>
    <p>슬라이드쇼에 관한 가이드입니다.</p>
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

export default defineComponent({
  name: 'Guide',
  setup()
  {
    const store = useStore();

    // lifecycles
    onMounted(() => {
      if (local.slides) local.slides.pause(true);
    });
    onUnmounted(() => {
      if (local.slides) local.slides.pause(false);
    });
    return {};
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
