<template>
<aside class="preference-side">
  <nav>
    <button
      type="button"
      :title="$t('base.general')"
      :disabled="mode === 'general'"
      class="preference-side__button"
      @click="$emit('click-menu', 'general')">
      <span>
        <Icon icon-name="tool"/>
        <em>{{$t('base.general')}}</em>
      </span>
    </button>
    <button
      v-if="$store.state.usePreference.slides"
      type="button"
      :title="$t('base.slides')"
      :disabled="mode === 'slides'"
      class="preference-side__button"
      @click="$emit('click-menu', 'slides')">
      <span>
        <Icon icon-name="copy"/>
        <em>{{$t('base.slides')}}</em>
      </span>
    </button>
    <button
      v-if="$store.state.usePreference.style"
      type="button"
      :title="$t('base.style')"
      :disabled="mode === 'style'"
      class="preference-side__button"
      @click="$emit('click-menu', 'style')">
      <span>
        <Icon icon-name="droplet"/>
        <em>{{$t('base.style')}}</em>
      </span>
    </button>
    <button
      v-if="$store.state.usePreference.data"
      type="button"
      :title="$t('base.data')"
      :disabled="mode === 'data'"
      class="preference-side__button"
      @click="$emit('click-menu', 'data')">
      <span>
        <Icon icon-name="database"/>
        <em>{{$t('base.data')}}</em>
      </span>
    </button>
    <button
      v-if="$store.state.usePreference.keyboard"
      type="button"
      :title="$t('base.keyboard')"
      :disabled="mode === 'keyboard'"
      class="preference-side__button"
      @click="$emit('click-menu', 'keyboard')">
      <span>
        <Icon icon-name="command"/>
        <em>{{$t('base.keyboard')}}</em>
      </span>
    </button>
    <button
      v-if="$store.state.usePreference.information"
      type="button"
      :title="$t('base.information')"
      :disabled="mode === 'information'"
      class="preference-side__button"
      @click="$emit('click-menu', 'information')">
      <span>
        <Icon icon-name="info"/>
        <em>{{$t('base.information')}}</em>
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
