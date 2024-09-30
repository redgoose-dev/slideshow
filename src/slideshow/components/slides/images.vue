<template>
<div class="images">
  <ul ref="$body" class="body">
    <li
      v-for="(item, key) in props.items"
      :ref="el => { $image[key] = el }"
      :class="[]">
      <img
        :src="item.src"
        :alt="item.title"/>
    </li>
  </ul>
  <i class="overlay"></i>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const props = defineProps({
  items: { type: Array, required: true }, //슬라이드 이미지 목록
  active: { type: Number, default: 0 }, // 초기 활성화되는 슬라이드
  loop: { type: Boolean, default: false }, // 무한대로 반복될지에 대한 여부
})
const emits = defineEmits([])
const $image = ref([])
const state = reactive({
  loaded: new Array(props.items)
})

onMounted(() => {
})
</script>

<style src="./images.scss" lang="scss" scoped></style>
