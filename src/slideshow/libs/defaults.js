/** @var {object} defaultPreference */
export const defaultPreference = {
  general: {
    // 슬라이드쇼에서 사용하는 각 항목 UI 표시할지에 대한 여부
    hud: true,
    // 슬라이드쇼에 갖다대면 hud 영역이 등장한다.
    visibleHudHover: false,
    // 슬라이드쇼를 클릭하면 hud 영역이 나왔다 없어진다.
    visibleHudClick: false,
    // 특정 항목을 사용할지에 대한 스위치
    hudContents: {
      // 슬라이드쇼 하위 요소들
      slots: true,
      // 캡션 영역
      caption: true,
      // 컨트롤러 영역
      controller: true,
      // 페이지 번호 영역
      paginate: true,
    },
  },
  slides: {
    // 마지막에서 처음으로 되돌리기
    loop: true,
    // 스와이프 사용여부
    swipe: true,
    // 트랜지션 종류 (none,fade,horizontal)
    transitionType: 'horizontal',
    // 트랜지션 속도 (ms)
    transitionSpeed: 500,
    // none,shuffle
    captionAnimationType: 'none',
    // 캡션 애니메이션 속도 (fps)
    captionAnimationSpeed: 40,
    // 자동재생 기능사용 (자동재생이 켜진다는 의미가 아니다)
    autoplay: false,
    // 자동재생 공백시간
    autoplayDelay: 7000,
    // next(true), prev(false)
    autoplayDirection: true,
    // 영역에 갖다댈때 자동재생 일시정지 여부
    autoplayPauseOnHover: true,
  },
  // 스타일
  style: {
    // 이미지 표시 타입 `none,contain,cover,scale-down,fill`
    imageType: 'contain',
    // 전체 영역에서 표시되는 이미지 사이즈 `[ width, height ]`
    imageScale: [ '100%', '100%' ],
    // 캡션 사이즈 퍼센트(%)
    captionScale: 100,
    // 캡션의 위치 [ left, top ]
    captionPosition: [ '32px', '30px' ],
  },
  // 키보드 이벤트
  keyboard: {
    // 이벤트 객체 `element,window`
    eventTarget: 'element',
    // 단축키 사용유무
    enable: true,
  },
}

/** @var {object} defaultLanguage */
export const defaultLanguage = {
  'direction.prev': 'Prev Slide',
  'direction.next': 'Next Slide',
  'error.title': 'Error',
  'error.title-empty': 'Empty',
  'error.empty': 'No slide data is available.',
}
