<template>
<article class="slideshow-caption">
  <h1>{{title}}</h1>
  <pre>{{description}}</pre>
</article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Caption',
  props: {
    title: { type: String, default: 'Untitled' },
    description: { type: String, default: null },
  },
});
</script>

<style lang="scss">
@import "../../scss/mixins";
.slideshow-caption {
  display: none;
  h1 {
    margin: 0;
    line-height: 1;
    font-size: 42px;
    letter-spacing: -1px;
    font-weight: 800;
  }
  pre {
    display: block;
    margin: 4px 0 0;
    font-family: var(--font-base);
    line-height: 1.05;
    word-break: break-word;
    font-weight: 400;
    font-size: 13px;
    letter-spacing: -.25px;
    color: var(--color-low-fill);
  }
  > *::selection {
    background-color: var(--color-key);
    color: var(--color-invert);
  }
  @include responsive(desktop) {
    display: block;
  }
  @include dark-mode() {
    > *::selection {
      color: var(--color-fill);
    }
  }
}
</style>
