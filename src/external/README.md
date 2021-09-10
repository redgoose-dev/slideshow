# for external project

외부 프로젝트에서 슬라이드쇼 컴포넌트를 사용하는 방법에 대한 테스트 코드들입니다.


## files

- `main.js`: vue 프로젝트 엔트리파일의 내용
- `External.vue`: 슬라이드쇼 컴포넌트를 감싸는 부모 컴포넌트
- `main.scss` 공통 스타일시트


## props

슬라이드쇼 props 가이드입니다.

- preference: [Preference defaults](https://github.com/redgoose-dev/slideshow/blob/main/src/store/defaults.js) 참고
- tree: [Management tree data](https://github.com/redgoose-dev/slideshow/tree/main#management-tree-data) 항목 참고
- group: 선택된 슬라이드 키값


## events

슬라이드쇼 events 가이드입니다.

```vue
<Slideshow
  @update-preference="preference => func(preference)"
  @update-tree="tree => func(tree)"
  @update-group="group => func(group)"
/>
```

- `update-preference`: 환경설정을 업데이트할때 실행합니다.
- `update-tree`: 슬라이드 데이터를 업데이트할때 실행합니다.
- `update-group`: 선택된 슬라이드가 변경되었을때 실행합니다.


## use module

슬라이드쇼를 모듈로 사용할때 `store`와 `i18n`을 따로 불러올 수 없다면 다음과 같이 번들링된 모듈로 가져올 수 있습니다.

```javascript
import store from '@redgoose/slideshow/docs/bundle/store';
import i18n from '@redgoose/slideshow/docs/bundle/i18n';
```
