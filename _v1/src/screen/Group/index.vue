<template>
<article class="groups" @touchstart="onTouchStart" @click="onClose">
  <div class="groups__wrap" @click="e => { e.stopPropagation() }">
    <header class="groups-header">
      <div class="groups-header__body">
        <h2>{{t('title.selectGroup')}}</h2>
        <p>{{t('description.selectGroup')}}</p>
      </div>
      <nav class="groups-header__nav">
        <button
          type="button"
          :title="t('base.close')"
          @click="onClose">
          <Icon icon-name="x"/>
        </button>
      </nav>
    </header>
    <div class="groups__body">
      <ul class="groups-index">
        <li v-for="item in computes.index">
          <Item
            :key="item.key"
            :src="item.src"
            :name="item.name"
            :description="item.description"
            :count="item.count"
            :selected="item.selected"
            @select="onSelectSlide(item.key)"/>
        </li>
      </ul>
    </div>
  </div>
</article>
</template>

<script setup>
import { reactive, computed, onMounted, onUnmounted } from 'vue';
import store from '../../store';
import i18n from '../../i18n';
import * as local from '../../libs/local';
import Icon from '../../components/Icon/index.vue';
import Item from './Item.vue';

const { t } = i18n.global;
let computes = reactive({
  index: computed(() => {
    const { tree, group } = store.state;
    return Object.keys(tree).map(key => {
      switch (typeof tree[key])
      {
        case 'object':
          const slide = tree[key].slides;
          if (!slide) return false;
          const firstSlide = (slide && slide.length > 0) ? slide[0] : null;
          let src = firstSlide ? (firstSlide.thumbnail || firstSlide.src) : null;
          return {
            key,
            name: tree[key].name,
            description: tree[key].description,
            count: Array.isArray(tree[key].slides) ? tree[key].slides.length : undefined,
            src,
            selected: key === group,
          };
        default:
          return false;
      }
    }).filter(Boolean);
  }),
});

// methods
function onTouchStart(e)
{
  if (e.touches && e.touches.length > 1) e.preventDefault();
}
function onClose()
{
  store.dispatch('changeMode', null);
}
function onSelectSlide(key)
{
  if (!confirm(t('confirm.selectGroup'))) return;
  store.dispatch('changeGroup', key);
  store.dispatch('changeMode', null);
  local.main.update('group');
  local.main.restart();
}

// lifecycles
onMounted(() => {
  if (local.slides) local.slides.pause(true);
});
onUnmounted(() => {
  if (local.slides) local.slides.pause(false);
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
