<template>
<article class="modal-wrapper" @click="$emit('close')">
  <div class="modal-wrapper__box" @click="e => { e.stopPropagation() }">
    <header class="modal-wrapper__header">
      <h2>{{title}}</h2>
      <nav>
        <button
          type="button"
          :title="t('base.close')"
          @click="$emit('close')">
          <Icon icon-name="x"/>
        </button>
      </nav>
    </header>
    <div class="modal-wrapper__body">
      <slot/>
    </div>
  </div>
</article>
</template>

<script setup>
import i18n from '~/i18n';
import Icon from '~/components/Icon/index.vue';

const name = 'ModalWrapper';
const { t } = i18n.global;
const props = defineProps({
  title: { type: String, default: 'Title' },
});
const emits = defineEmits({ 'close': null });
</script>

<style src="./ModalWrapper.scss" lang="scss" scoped></style>
