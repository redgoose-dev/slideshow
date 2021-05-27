<template>
<nav class="controller">
  <button
    v-if="showPrev"
    type="button"
    :disabled="disabled"
    :title="$t('label.prevSlide')"
    class="prev"
    @click="$emit('click-prev')">
    <Icon icon-name="arrow-left"/>
  </button>
  <button
    v-if="showNext"
    type="button"
    :disabled="disabled"
    :title="$t('label.nextSlide')"
    class="next"
    @click="$emit('click-next')">
    <Icon icon-name="arrow-right"/>
  </button>
</nav>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'SlidesController',
  components: {
    Icon,
  },
  props: {
    showPrev: { type: Boolean, default: true },
    showNext: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
  },
  emits: {
    'click-prev': null,
    'click-next': null,
  },
});
</script>

<style src="./Controller.scss" lang="scss" scoped></style>
