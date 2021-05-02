<template>
<article class="empty">
  <div class="empty__wrap">
    <Icon
      icon-name="frown"
      class="empty__icon"/>
    <h2 class="empty__title">
      {{$t('slides.empty.title')}}
    </h2>
    <p class="empty__description">
      {{$t('slides.empty.description')}}
    </p>
  </div>
</article>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'SlidesEmpty',
  components: {
    Icon,
  },
});
</script>

<style src="./Empty.scss" lang="scss" scoped></style>
