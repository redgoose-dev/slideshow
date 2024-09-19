<template>
<article class="dev">
<!--  <nav>-->
<!--    <button @click="onClickFire">FIRE</button>-->
<!--    <button @click="onClickRestart">RESETART</button>-->
<!--  </nav>-->
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
const preference = ref({
  general: {
    FOO: 'barrrr',
    language: 'ko',
  },
})

function onUpdatedPreference(src)
{
  preference.value = src
}
function onUpdatedSlides(src)
{
  console.log('onUpdatedSlides()', src)
}

async function onClickFire()
{
  preference.value.general.language = 'FRE'
  // $slideshow.value.restart()
}
async function onClickRestart()
{
  $slideshow.value.restart()
}

//.dev {
//  height: 100dvh;
//  box-sizing: border-box;
//}
</script>

<style src="./index.scss" lang="scss" scoped>
</style>
