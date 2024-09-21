<template>
<div class="container">
  <Slides/>
</div>
</template>

<script setup>
import { inject } from 'vue'
import Slides from '../slides/index.vue'

const { updatePreference } = inject('preference')

// TODO: 루트 컴포넌트로 이벤트 보내기 실험
// function onClickTrigger()
// {
//   updatePreference({
//     general: {
//       FOOWWW: 'BARRRRR',
//     }
//   })
// }
</script>

<style src="./index.scss" lang="scss" scoped></style>
