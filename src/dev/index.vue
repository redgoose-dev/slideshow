<template>
<article class="dev">
<!--  <nav>-->
<!--    <button @click="onClickFire">FIRE</button>-->
<!--    <button @click="onClickRestart">RESETART</button>-->
<!--  </nav>-->
  <Slideshow
    ref="$slideshow"
    :preference="preference"
    :slides="slides"
    @update-preference="onUpdatedPreference"
    @update-slides="onUpdatedSlides"/>
</article>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Slideshow from '../slideshow/index.vue'
import { defaultSlides } from '../slideshow/libs/defaults.js'
import { cloneObject } from '../slideshow/libs/util.js'

const $slideshow = ref()
const preference = ref({
  general: {
    FOO: 'barrrr',
    language: 'ko',
  },
})
const slides = ref(cloneObject(defaultSlides))

function onUpdatedPreference(src)
{
  // console.warn('[onUpdatedPreference()]')
  preference.value = src
}
function onUpdatedSlides(src)
{
  // console.warn('[onUpdatedSlides()]')
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
</script>

<style src="./index.scss" lang="scss" scoped>
</style>
