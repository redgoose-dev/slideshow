<template>
<article class="manage-tree-ui">
  <p>coming soon..</p>
</article>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PreferenceDataManage',
  components: {},
  props: {
    tree: { type: Object, required: true },
  },
  setup(props, context)
  {
    //
  },
  emits: {
    'update': null,
  },
});
</script>

<style lang="scss" scoped></style>
