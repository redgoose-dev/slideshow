<template>
<article class="manage-tree">
  <section
    v-for="(item,k) in computes.index"
    class="tree-item">
    <header class="tree-item__header">
      <nav>
        <button
          type="button"
          title="toggle fold"
          :class="[
            'fold',
            state.fold[k] && 'fold--on',
          ]"
          @click="onToggleFold(k)">
          <Icon icon-name="arrow-down"/>
        </button>
      </nav>
      <h3>{{item.name}} <em>{{item.slides.length}}</em></h3>
      <nav>
        <button
          type="button"
          title="edit category"
          class="edit"
          @click="">
          <Icon icon-name="edit"/>
        </button>
        <button
          type="button"
          title="remove category"
          class="remove"
          @click="">
          <Icon icon-name="x"/>
        </button>
      </nav>
    </header>
    <Slides
      v-if="state.fold[k]"
      :item-key="state.keys[k]"
      :items="item.slides"
      @update="o => onUpdateSlides(state.keys[k], o)"/>
    <nav class="tree-item__add">
      <button type="button">add slide</button>
    </nav>
  </section>
  <nav class="add-tree">
    <ButtonBasic
      title="Add category"
      color="key"
      @click="">
      Add slide category
    </ButtonBasic>
  </nav>
</article>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { convertPureObject } from '~/libs/object';
import Icon from '~/components/Icon';
import ButtonBasic from '~/components/Button/Basic';
import Slides from './Slides';

export default defineComponent({
  name: 'PreferenceDataManage',
  components: {
    Icon,
    ButtonBasic,
    Slides,
  },
  props: {
    tree: { type: Object, required: true },
  },
  setup(props, context)
  {
    let state = reactive({
      index: props.tree,
      keys: Object.keys(props.tree),
      fold: new Array(Object.keys(props.tree).length).fill(false),
      dragPlaceholder: undefined,
    });
    let computes = reactive({
      index: computed(() => {
        const keys = Object.keys(state.index);
        return keys.map(key => (state.index[key]));
      }),
    });

    // methods
    function onToggleFold(key)
    {
      state.fold[key] = !state.fold[key];
    }
    function onUpdateSlides(key, newSlides)
    {
      state.index[key].slides = newSlides;
      context.emit('update', convertPureObject(state.index));
    }

    return {
      state,
      computes,
      onToggleFold,
      onUpdateSlides,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
