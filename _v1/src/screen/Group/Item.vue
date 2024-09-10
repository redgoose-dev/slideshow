<template>
<div class="group-item">
  <a
    :class="[ 'group-item-wrap', props.selected && 'group-item-wrap--selected' ]"
    @click="onSelectItem">
    <figure class="group-item__image">
      <img v-if="props.src" :src="props.src" :alt="props.name">
      <Icon v-else icon-name="x"/>
    </figure>
    <div class="group-item__body">
      <h3 :class="[ !props.name && 'none' ]">
        {{ props.name ? props.name : 'None' }}
      </h3>
      <p>{{props.description}}</p>
      <ul v-if="props.count !== undefined" class="group-item__meta">
        <li><b>Count: {{props.count}}</b></li>
      </ul>
    </div>
  </a>
</div>
</template>

<script setup>
import Icon from '../../components/Icon/index.vue';

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
