<template>
<article
  class="empty"
  @click="onClickWrapper">
  <div class="empty__wrap">
    <Icon
      icon-name="frown"
      class="empty__icon"/>
    <h2 class="empty__title">
      {{$t('title.emptySlide')}}
    </h2>
    <p class="empty__description">
      {{$t('description.addSlides')}}
    </p>
  </div>
</article>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'SlidesEmpty',
  components: {
    Icon,
  },
  setup()
  {
    const store = useStore();

    // methods
    function onClickWrapper(e)
    {
      if (store.state.preference.general.clickVisibleHud)
      {
        store.dispatch('changeHud');
      }
    }

    return {
      onClickWrapper,
    };
  },
});
</script>

<style src="./Empty.scss" lang="scss" scoped></style>
