<template>
<article class="empty" @click="onClickWrapper">
  <div class="empty__wrap">
    <Icon
      icon-name="frown"
      class="empty__icon"/>
    <h2 class="empty__title">
      {{title || t('title.emptySlide')}}
    </h2>
    <p class="empty__description">
      {{description || t('description.addSlides')}}
    </p>
  </div>
</article>
</template>

<script setup>
import store from '../../store';
import i18n from '../../i18n';
import Icon from '../../components/Icon/index.vue';

const { t } = i18n.global;
const props = defineProps({
  title: String,
  description: String,
});

// methods
function onClickWrapper()
{
  if (store.state.preference.general.clickVisibleHud)
  {
    store.dispatch('changeHud');
  }
}
</script>

<style src="./Empty.scss" lang="scss" scoped></style>
