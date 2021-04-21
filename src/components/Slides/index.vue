<template>
<article class="slideshow-slides">
  <p>image component</p>
  <Caption/>
  <p>controller component</p>
  <p>paginate component</p>
</article>
</template>

<script>
import { defineComponent } from 'vue';
import Caption from './Caption.vue';

export default defineComponent({
  name: 'Slides',
  components: {
    Caption,
  },
});
</script>
