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

https://redgoose-dev.github.io/slideshow/


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
  :language="language"
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
const language = ref({})
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

슬라이드쇼 컴포넌트는 다음 props 값을 사용합니다.

### preference

슬라이드쇼의 환경설정 값입니다.
[defaults.js](https://github.com/redgoose-dev/slideshow/blob/2.0/src/slideshow/libs/defaults.js) 파일에서 `defaultPreference`값이 기본값이며 이 구조에서 값을 변경하여 설정을 고쳐서 사용할 수 있습니다.

### slides

슬라이드 배열 데이터입니다.
이미지 주소, 썸네일 이미지 주소, 제목, 설명 값을 사용하며 다음과 같은 구조로 슬라이드 데이터를 만듭니다.

```json
[
  {
    "src": "image.jpg",
    "thumbnail": "thumbnail.webp",
    "title": "slide title",
    "description": "slide description"
  },
  {
    "src": "image.jpg",
    "thumbnail": "thumbnail.webp",
    "title": "slide title",
    "description": "slide description"
  }
]
```

### language

슬라이드쇼에서 사용하는 메시지 값
[defaults.js](https://github.com/redgoose-dev/slideshow/blob/2.0/src/slideshow/libs/defaults.js) 파일에서 `defaultLanguage`값이 기본값이며 이 값을 기반으로 값을 만들어 사용하면 됩니다.

### active

활성화된 슬라이드 키값
`v-model:active`값으로 사용할 수 있고, `v-model`을 사용하지 않는다면 다음과 같이 컴포넌트를 구성할 수 있습니다.

```vue
<template>
<Slideshow :active="`1`" @update:active="onUpdateActive"/>
</template>

<script setup>
function onUpdateActive() {}
</script>
```

### autoplay

슬라이드 자동재생 사용유무
`v-model:active`값으로 사용할 수 있고, `v-model`을 사용하지 않는다면 다음과 같이 컴포넌트를 구성할 수 있습니다.

```vue
<template>
<Slideshow :autoplay="true" @update:autoplay="onUpdateAutoplay"/>
</template>

<script setup>
function onUpdateAutoplay() {}
</script>
```

### theme

슬라이드쇼 색상테마이며 주로 라이트모드, 다크모드로 사용됩니다.
`light`, `dark` 값으로 사용할 수 있으며 값이 없으면 시스템 다크모드 설정을 따라갑니다.


## Events

### update:active

활성화된 슬라이드 키값이 바뀌었을때 발생하는 이벤트

```vue
<template>
<Slideshow :active="active" @update:active="onUpdateActive"/>
</template>

<script setup>
const active = ref('1')
function onUpdateActive(key) {
  console.log('onUpdateActive()', key)
  active.value = key
}
</script>
```

### update:autoplay

슬라이드 자동재생 상태가 바뀌었을때 호출되는 이벤트

```vue
<template>
<Slideshow :autoplay="autoplay" @update:autoplay="onUpdateAutoplay"/>
</template>

<script setup>
const autoplay = ref(false)
function onUpdateAutoplay(sw) {
  console.log('onUpdateAutoplay()', sw)
  autoplay.value = sw
}
</script>
```


## Methods

컴포넌트를 어딴 기능을 작동시킬 수 있습니다. 메서드를 사용하는 예제는 다음과 같습니다.

```vue

<template>
<Slideshow ref="$slideshow"/>
</template>

<script setup>
const $slideshow = ref()
// start
onMounted(() => {
  $slideshow.value.start() // start
  $slideshow.value.stop() // stop
  $slideshow.value.restart() // restart
  $slideshow.value.prev() // prev slide
  $slideshow.value.next() // next slide
  $slideshow.value.change('2') // change slide
  $slideshow.value.exportData() // export data
  $slideshow.value.getKeys() // get slides key
})
</script>
```


## Slot

컴포넌트 슬롯 기능을 이용하여 슬라이드쇼 내부에 요소를 삽입할 수 있습니다. 예를들어 슬라이드쇼를 제어하는 버튼이나 현재 상태를 표시하는 오버레이 같은 것들을 직접 제작하여 사용할 수 있습니다.

```vue
<template>
<Slideshow>
  <nav>
    <button type="button" @click="">Menu</button>
  </nav>
</Slideshow>
</template>
<style scoped></style>
```
