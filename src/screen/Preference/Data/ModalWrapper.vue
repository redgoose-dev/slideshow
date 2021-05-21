<template>
<article class="modal-wrapper" @click="$emit('close')">
  <div class="modal-wrapper__box" @click="e => { e.stopPropagation() }">
    <header class="modal-wrapper__header">
      <h2>{{title}}</h2>
      <nav>
        <button
          type="button"
          :title="$t('base.close')"
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

<script>
import { defineComponent } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'ModalWrapper',
  components: {
    Icon,
  },
  props: {
    title: { type: String, default: 'Title' },
  },
  emits: {
    'close': null,
  },
});
</script>

<style src="./ModalWrapper.scss" lang="scss" scoped></style>
