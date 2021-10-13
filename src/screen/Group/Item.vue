<template>
<div :class="[
  'group-item',
  selected && 'group-item--selected'
]">
  <a
    :class="[
      'group-item-wrap',
      selected && 'group-item-wrap--selected',
    ]"
    @click="onSelectItem">
    <figure class="group-item__image">
      <img v-if="src" :src="src" :alt="name">
      <Icon v-else icon-name="x"/>
    </figure>
    <div class="group-item__body">
      <h3 :class="[ !name && 'none' ]">
        {{ name ? name : 'None' }}
      </h3>
      <p>{{description}}</p>
      <ul v-if="count !== undefined" class="group-item__meta">
        <li><b>Count: {{count}}</b></li>
      </ul>
    </div>
  </a>
</div>
</template>

<script setup>
import Icon from '~/components/Icon/index.vue';

const name = 'GroupItem';
const props = defineProps({
  src: String,
  name: String,
  description: String,
  count: Number,
  selected: Boolean,
});
const emits = defineEmits([ 'select' ]);

function onSelectItem(e)
{
  e.preventDefault();
  emits('select');
}
</script>

<style src="./Item.scss" lang="scss" scoped></style>
