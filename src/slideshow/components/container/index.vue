<template>
<article class="container">
  <p>.container asdasd</p>
  <nav>
    <button @click="onClickTrigger">
      TRIGGER
    </button>
  </nav>
</article>
</template>

<script setup>
import { inject } from 'vue'

const { updatePreference } = inject('preference')

function onClickTrigger()
{
  updatePreference({
    general: {
      FOOWWW: 'BARRRRR',
    }
  })
}
</script>

<style src="./index.scss" lang="scss" scoped></style>
