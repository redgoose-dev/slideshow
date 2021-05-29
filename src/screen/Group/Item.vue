<template>
<div :class="[
  'group-item',
  selected && 'group-item--selected'
]">
  <figure class="group-item__image">
    <button
      type="button"
      :disabled="selected"
      @click="$emit('select')">
      <img v-if="src" :src="src" :alt="name">
      <Icon v-else icon-name="x"/>
    </button>
  </figure>
  <div class="group-item__body">
    <h3 :class="[ !name && 'none' ]">
      {{ name ? name : 'None' }}
    </h3>
    <p>{{description}}</p>
    <ul v-if="count !== undefined" class="group-item__meta">
      <li>Count: <b>{{count}}</b></li>
    </ul>
  </div>
  <nav v-if="!selected" class="group-item__nav">
    <button type="button" @click="$emit('select')">
      <Icon icon-name="check"/>
    </button>
  </nav>
</div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'GroupItem',
  components: {
    Icon,
  },
  props: {
    src: String,
    name: String,
    description: String,
    count: Number,
    selected: Boolean,
  },
  setup()
  {
    return {};
  },
  emits: {
    'select': null,
  },
});
</script>

<style src="./Item.scss" lang="scss" scoped></style>
