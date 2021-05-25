<template>
<ul :data-key="itemKey" class="data-slides">
  <li
    v-for="(slide,k) in items"
    :data-key="k"
    :draggable="true"
    :class="[
      'data-slide',
      state.dragStartKey === k && 'data-slide--start',
      state.dragStartKey !== state.dragPlaceholderKey && state.dragPlaceholderKey === k && 'data-slide--placeholder',
    ]"
    @mousedown="onMouseDown"
    @dragstart="onDragStart">
    <div class="data-slide__handle">
      <i>
        <Icon icon-name="menu-flat"/>
      </i>
    </div>
    <div class="data-slide__body">
      <h4 v-if="slide.title">{{slide.title}}</h4>
      <p v-if="slide.description">{{slide.description}}</p>
      <nav>
        <a :href="slide.src" target="_blank">Image</a>
        <a v-if="slide.thumbnail" :href="slide.thumbnail" target="_blank">Thumbnail</a>
      </nav>
    </div>
    <nav class="data-slide__nav">
      <button type="button" title="Edit" class="edit" @click="$emit('edit', k)">
        <Icon icon-name="edit"/>
      </button>
      <button type="button" title="Edit" class="remove" @click="$emit('remove', k)">
        <Icon icon-name="x"/>
      </button>
    </nav>
  </li>
  <li v-if="!(items && items.length > 0)" class="data-slides__empty">
    empty
  </li>
</ul>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { convertPureObject } from '~/libs/object';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'Slides',
  components: {
    Icon,
  },
  props: {
    itemKey: String,
    items: { type: Array, required: true },
  },
  setup(props, context)
  {
    let state = reactive({
      dragStartKey: undefined,
      dragPlaceholderKey: undefined,
    });
    let dragTarget;
    let dragItems;

    // methods
    function getTargetElement(el)
    {
      return el.dataset.key ? el : el.closest('li');
    }
    function onMouseDown(e)
    {
      dragTarget = e.target;
    }
    function onDragStart(e)
    {
      if (!dragTarget.closest('.data-slide__handle > i'))
      {
        e.preventDefault();
        return;
      }
      dragTarget = getTargetElement(e.target);
      dragItems = dragTarget.parentNode.children;
      state.dragStartKey = Number(dragTarget.dataset.key);
      for (let i=0; i<dragItems.length; i++)
      {
        dragItems[i].addEventListener('dragover', onDragOver);
        dragItems[i].addEventListener('drop', onDrop);
        dragItems[i].addEventListener('dragend', onDragEnd);
      }
    }
    function onDragOver(e)
    {
      if (e.preventDefault) e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      let target = getTargetElement(e.target);
      state.dragPlaceholderKey = Number(target.dataset.key);
    }
    function onDrop(e)
    {
      let target = getTargetElement(e.target);
      if (state.dragStartKey === state.dragPlaceholderKey) return;
      let clone = convertPureObject(props.items);
      clone[state.dragStartKey] = convertPureObject(props.items[Number(target.dataset.key)]);
      clone[Number(target.dataset.key)] = convertPureObject(props.items[state.dragStartKey]);
      context.emit('update', clone);
    }
    function onDragEnd()
    {
      if (!(dragTarget && dragItems)) return;
      for (let i=0; i<dragItems.length; i++)
      {
        dragItems[i].removeEventListener('dragover', onDragOver);
        dragItems[i].removeEventListener('drop', onDrop);
        dragItems[i].removeEventListener('dragend', onDragEnd);
      }
      dragTarget = undefined;
      dragItems = undefined;
      state.dragStartKey = undefined;
      state.dragPlaceholderKey = undefined;
    }

    return {
      state,
      onMouseDown,
      onDragStart,
    };
  },
  emits: {
    'update': null,
    'edit': null,
    'remove': null,
  },
});
</script>

<style src="./Slides.scss" lang="scss" scoped></style>
