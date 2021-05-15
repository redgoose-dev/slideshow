<template>
<aside class="preference-side">
  <nav>
    <button
      type="button"
      :title="$t('preference.header.general.title')"
      :disabled="mode === 'general'"
      class="preference-side__button"
      @click="$emit('click-menu', 'general')">
      <span>
        <Icon icon-name="tool"/>
        <em>{{$t('preference.header.general.title')}}</em>
      </span>
    </button>
    <button
      type="button"
      :title="$t('preference.header.slides.title')"
      :disabled="mode === 'slides'"
      class="preference-side__button"
      @click="$emit('click-menu', 'slides')">
      <span>
        <Icon icon-name="copy"/>
        <em>{{$t('preference.header.slides.title')}}</em>
      </span>
    </button>
    <button
      type="button"
      :title="$t('preference.header.style.title')"
      :disabled="mode === 'style'"
      class="preference-side__button"
      @click="$emit('click-menu', 'style')">
      <span>
        <Icon icon-name="droplet"/>
        <em>{{$t('preference.header.style.title')}}</em>
      </span>
    </button>
    <button
      type="button"
      :title="$t('preference.header.data.title')"
      :disabled="mode === 'data'"
      class="preference-side__button"
      @click="$emit('click-menu', 'data')">
      <span>
        <Icon icon-name="database"/>
        <em>{{$t('preference.header.data.title')}}</em>
      </span>
    </button>
    <button
      type="button"
      :title="$t('preference.header.keyboard.title')"
      :disabled="mode === 'keyboard'"
      class="preference-side__button"
      @click="$emit('click-menu', 'keyboard')">
      <span>
        <Icon icon-name="command"/>
        <em>{{$t('preference.header.keyboard.title')}}</em>
      </span>
    </button>
    <button
      type="button"
      :title="$t('preference.header.information.title')"
      :disabled="mode === 'information'"
      class="preference-side__button"
      @click="$emit('click-menu', 'information')">
      <span>
        <Icon icon-name="info"/>
        <em>{{$t('preference.header.information.title')}}</em>
      </span>
    </button>
  </nav>
</aside>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'preference-side',
  components: {
    Icon,
  },
  props: {
    mode: { type: String, required: true },
  },
});
</script>

<style src="./Side.scss" lang="scss" scoped></style>
