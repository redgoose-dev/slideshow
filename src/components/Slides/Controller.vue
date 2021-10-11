<template>
<nav class="controller">
  <button
    v-if="showPrev"
    type="button"
    :disabled="disabled"
    :title="t('label.prevSlide')"
    class="prev"
    @click="$emit('click-prev')">
    <Icon icon-name="arrow-left"/>
  </button>
  <button
    v-if="showNext"
    type="button"
    :disabled="disabled"
    :title="t('label.nextSlide')"
    class="next"
    @click="$emit('click-next')">
    <Icon icon-name="arrow-right"/>
  </button>
</nav>
</template>

<script setup>
import Icon from '~/components/Icon/index.vue';
import i18n from '~/i18n';

const { t } = i18n.global;
const props = defineProps({
  showPrev: { type: Boolean, default: true },
  showNext: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
});
const emits = defineEmits({
  'click-prev': null,
  'click-next': null,
});
</script>

<style src="./Controller.scss" lang="scss" scoped></style>
