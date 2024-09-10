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
      <h4 :class="!slide.title ? 'none' : ''">
        {{slide.title || 'None'}}
      </h4>
      <p v-if="slide.description">{{slide.description}}</p>
      <nav>
        <a :href="slide.src" target="_blank">
          {{t('base.image')}}
        </a>
        <a v-if="slide.thumbnail" :href="slide.thumbnail" target="_blank">
          {{t('base.thumbnail')}}
        </a>
      </nav>
    </div>
    <nav class="data-slide__nav">
      <button
        type="button"
        :title="t('base.edit')"
        class="edit"
        @click="emits('edit', k)">
        <Icon icon-name="edit"/>
      </button>
      <button
        type="button"
        :title="t('base.remove')"
        class="remove"
        @click="emits('remove', k)">
        <Icon icon-name="x"/>
      </button>
    </nav>
  </li>
  <li v-if="!(items && items.length > 0)" class="data-slides__empty">
    {{t('description.empty')}}
  </li>
</ul>
</template>

<script setup>
import { reactive } from 'vue';
import i18n from '../../../../i18n';
import { convertPureObject } from '../../../../libs/object';
import Icon from '../../../../components/Icon/index.vue';

const name = 'Slides';
const { t } = i18n.global;
const props = defineProps({
  itemKey: String,
  items: { type: Array, required: true },
});
const emits = defineEmits([ 'change-order', 'edit', 'remove' ]);
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
  clone.splice(state.dragStartKey, 1);
  clone.splice(Number(target.dataset.key), 0, convertPureObject(props.items[state.dragStartKey]));
  emits('change-order', clone);
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
</script>

<style src="./Slides.scss" lang="scss" scoped></style>
