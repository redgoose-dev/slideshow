<template>
<div class="slides">
  <Images/>
  <Caption/>
  <Controller/>
  <Paginate/>
</div>
</template>

<script setup>
import { ref, computed, provide, reactive } from 'vue'
import { slidesStore, preferenceStore } from '../../store/index.js'
import Images from './images.vue'
import Caption from './caption.vue'
import Controller from './controller.vue'
import Paginate from './paginate.vue'

const preference = preferenceStore()
const slides = slidesStore()
</script>

<style src="./index.scss" lang="scss" scoped></style>
