![SLIDESHOW](https://i.ibb.co/2YHhDG2/app-icon.png)

# vue-slideshow

가족앨범 사진들을 디스플레잉을 어떻게 할 수 있을까 고민하다가 슬라이드쇼 프로젝트를 시작하게 되었습니다.  
예전에 만든 슬라이드쇼를 제대로 만들어본 경험으로 더 좋은 모습으로 만들고 했습니다.

슬라이드쇼의 목적은 브라우저 전체화면으로 사진을 한장씩 넘겨보는것입니다.  
이 프로그램의 특징을 요약하자면 다음과 같습니다.

- 자동재생
- 터치 디바이스 지원
- 다국어
- 트랜지션 타입 설정
- 슬라이드 캡션
- 다크모드
- 키보드 단축키


## Usage

이 프로젝트는 `Vue Component`로 사용할 수 있으며 다음과 같이 설치하고 사용합니다.

```shell
npm install -d @redgoose/vue-slideshow
```

```vue
<template>
<Slideshow
  :preference="preference"
  :slides="slides"
  class="slideshow"/>
</template>

<script setup>
import { ref } from 'vue'
import Slideshow from '@redgoose/vue-slideshow'
import '@redgoose/vue-slideshow/style'

const preference = ref({
  slides: {},
})
const slides = ref([
  {
    src: 'image.jpg',
    thumbnail: 'img.webp',
    title: '슬라이드 제목',
    description: '설명 내용..',
  },
  {
    src: 'image.jpg',
    thumbnail: 'img.webp',
    title: '슬라이드 제목',
    description: '설명 내용..',
  },
  {
    src: 'image.jpg',
    thumbnail: 'img.webp',
    title: '슬라이드 제목',
    description: '설명 내용..',
  },
])
</script>

<style scoped>
.slideshow {
  --slideshow-width: 640px;
  --slideshow-height: 480px;
}
</style>
```



### Props data

