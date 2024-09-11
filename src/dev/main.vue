<template>
<article class="dev">
  <nav>
    <button @click="onClickFire">FIRE</button>
  </nav>
  <Slideshow
    ref="$slideshow"
    :preference="preference"
    :slides="[]"
    @update-preference="onUpdatedPreference"
    @update-slides="onUpdatedSlides"/>
</article>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Slideshow from '../slideshow/index.vue'

const $slideshow = ref()
const preference = reactive({
  general: {
    FOO: 'barrrr',
    language: 'ko',
  },
})

function onUpdatedPreference(src)
{
  console.log('onUpdatePreference()', src)
  // preference.value = pref
}
function onUpdatedSlides(src)
{
  console.log('onUpdatedSlides()', src)
}

async function onClickFire()
{
  preference.general.language = 'FRE'
  $slideshow.value.restart()
}
</script>

<style scoped>
.dev {
  height: 100dvh;
  box-sizing: border-box;
}
</style>
