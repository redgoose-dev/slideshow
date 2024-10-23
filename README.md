![SLIDESHOW](https://i.ibb.co/2YHhDG2/app-icon.png)

# vue-slideshow

가족앨범 사진들을 디스플레잉을 어떻게 할 수 있을까 고민하다가 슬라이드쇼 프로젝트를 시작하게 되었습니다.  
예전에 만든 슬라이드쇼를 제대로 만들어본 경험으로 더 좋은 모습으로 만들고 했습니다.

슬라이드쇼의 목적은 브라우저 전체화면으로 사진을 한장씩 넘겨보는 Vue 컴포넌트 입니다.
이 프로그램의 특징을 요약하자면 다음과 같습니다.

- 자동재생
- 터치 디바이스 지원
- 다국어
- 트랜지션 타입 설정
- 슬라이드 캡션
- 다크모드
- 키보드 단축키


## Demo

> 데모링크: TODO


## Usage

이 프로젝트는 `Vue Component`로 사용할 수 있으며 다음과 같이 설치하고 사용합니다.

```shell
npm install -d @redgoose/vue-slideshow
bun add -d @redgoose/vue-slideshow
```

패키지를 설치하고 vue 컴포넌트에서 다음과 같이 코드를 추가합니다.

```vue
<template>
<Slideshow
  v-model:active="state.active"
  v-model:autoplay="state.autoplay"
  :preference="preference"
  :slides="slides"
  :theme="state.theme"
  class="slideshow"/>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Slideshow from '@redgoose/vue-slideshow'
import '@redgoose/vue-slideshow/style'

const state = reactive({
  active: '1',
  autoplay: true,
  theme: 'system',
})
const preference = ref({})
const slides = ref([])
</script>

<style scoped>
.slideshow {
  --slideshow-width: 640px;
  --slideshow-height: 480px;
}
</style>
```

정상적으로 작동된다면 다음과 같은 화면을 볼 수 있습니다.

![slideshow preview](https://i.ibb.co/NSFG5v8/screen.jpg)


## Props

슬라이드쇼 컴포넌트는 props 값으로 상태를 조절할 수 있습니다.

TODO

### active
### autoplay
### preference
### slides
### language
### theme


## Events

TODO

- update:active
- update:autoplay

## Methods

TODO

- stop()
- start()
- restart()
- exportData()
- prev()
- next()
- change()


## Slot

TODO


