<template>
<p class="paginate">{{current}} / {{total}}</p>
</template>

<script setup>
import { computed } from 'vue'
import { slidesStore } from '../../store/index.js'

const slides = slidesStore()

const total = computed(() => {
  return slides.order.length
})
const current = computed(() => {
  return slides.activeIndex + 1
})
</script>

<style lang="scss" scoped>
.paginate {
  position: absolute;
  right: 24px;
  bottom: 16px;
  z-index: 2;
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  line-height: 1.05;
  font-size: 13px;
  letter-spacing: -.5px;
  pointer-events: none;
  user-select: none;
}
</style>
