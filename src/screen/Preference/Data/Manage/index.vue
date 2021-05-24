<template>
<article class="manage-tree">
  <section
    v-for="item in computes.index"
    class="tree-item">
    <header class="tree-item__header">
      <h3>{{item.name}}</h3>
      <nav>
        <button
          type="button"
          title="edit category"
          @click="">
          <Icon icon-name="edit"/>
        </button>
        <button
          type="button"
          title="remove category"
          @click="">
          <Icon icon-name="x"/>
        </button>
        <button
          type="button"
          title="toggle fold"
          class="fold"
          @click="">
          <Icon icon-name="arrow-down"/>
        </button>
      </nav>
    </header>
    <ul class="tree-item__index">
      <li v-for="(slide,k) in item.slides" class="tree-slide">
        <div class="tree-slide__handle">
          <i>
            <Icon icon-name="menu-flat"/>
          </i>
        </div>
        <div class="tree-slide__body">
          <h4 v-if="slide.title">
            <em>{{k}}</em>{{slide.title}}
          </h4>
          <p v-if="slide.description">
            {{slide.description}}
          </p>
          <nav>
            <a :href="slide.src" target="_blank">Image</a>
            <a v-if="slide.thumbnail" :href="slide.thumbnail" target="_blank">Thumbnail</a>
          </nav>
        </div>
        <nav class="tree-slide__nav">
          <button type="button">
            <Icon icon-name="edit"/>
          </button>
          <button type="button">
            <Icon icon-name="x"/>
          </button>
        </nav>
      </li>
    </ul>
    <nav class="tree-item__add">
      <button type="button">add slide</button>
    </nav>
  </section>
  <nav class="add-tree">
    <button type="button" @click="">
      add category
    </button>
  </nav>
</article>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'PreferenceDataManage',
  components: {
    Icon,
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
    });
    let computes = reactive({
      index: computed(() => {
        const keys = Object.keys(state.index);
        return keys.map(key => (state.index[key]));
      }),
    });

    // methods

    return {
      state,
      computes,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
