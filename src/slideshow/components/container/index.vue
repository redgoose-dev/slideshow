<template>
<article>
  <p>.container</p>
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
  updatePreference({ FOO: 'BARRRRR' })
}
</script>

<style lang="scss" scoped>
</style>
