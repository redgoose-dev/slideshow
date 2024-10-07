/** @var {object} defaultPreference */
export const defaultPreference = {
  general: {
    // language: 'en', // en,ko // TODO: 이건 외부 props로 받아서 사용하는것이 좋을거 같다. 분량은 많이 않을거라고 예상된다.
    hud: true, // TODO
    visibleHudHover: false, // TODO: 슬라이드쇼에 갖다대면 hud 영역이 등장한다.
    visibleHudClick: false, // TODO: 클릭하면 hud 영역이 나왔다 없어진다.
    visibleHudContents: { // TODO
      slots: true,
      caption: true,
      controller: true,
      paginate: true,
    },
  },
  slides: {
    loop: true, // 마지막에서 처음으로 되돌리기
    swipe: true, // 스와이프 사용여부
    transitionType: 'horizontal', // 트랜지션 종류 (none,fade,horizontal)
    transitionSpeed: 500, // 트랜지션 속도 (ms)
    captionAnimationType: 'none', // none,shuffle
    captionAnimationDelay: 0, // 캡션 애니메이션 딜레이 (ms)
    captionAnimationSpeed: 40, // 캡션 애니메이션 속도 (fps)
    autoplay: false, // 자동재생 기능사용 (자동재생이 켜진다는 의미가 아니다)
    autoplayDelay: 7000, // 자동재생 공백시간
    autoplayDirection: true, // next(true), prev(false)
    autoplayPauseOnHover: true, // 영역에 갖다댈때 자동재생 일시정지 여부
  },
  style: {
    displayTheme: 'system', // dark,light,system
    imageType: 'cover', // none,contain,cover
    imageScale: [ '100%', '100%' ], // [ width, height ]
    captionScale: 100, // 캡션 사이즈 퍼센트(%)
    captionPosition: [ '32px', '30px' ], // [ left, top ]
  },
  keyboard: {
    enabled: true, // TODO
  },
}

/** @var {object[]} defaultSlides */
export const defaultSlides = [
  {
    src: 'https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=70',
    thumbnail: 'https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70',
    title: 'Sunset over the mountains of Skye',
    description: 'Published on October 21, 2016',
  },
  {
    src: 'https://goose.redgoose.me/data/upload/original/202407/baguni-001.webp',
    thumbnail: 'https://goose.redgoose.me/data/upload/original/202407/baguni-001.webp',
    title: '바구니 (Baguni)',
    description: '나 다른 파일들을 보관과 탐색을 목적으로 하는 툴을 만들자는 아이디어를 여러 번 작성해왔다. 어쩌면 FUI 리소스를 보관하거나 생성하는 툴을 만드려다가 먼저 보관하는 부분을 먼저 만들어야겠다는 필요성을 느꼈던..',
  },
  {
    src: 'https://images.unsplash.com/photo-1580996378027-23040f16f157?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=70',
    thumbnail: 'https://images.unsplash.com/photo-1580996378027-23040f16f157?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70',
    title: 'Reflet de la ville sur l\'eau Amsterdam',
    description: 'Published on February 6, 2020',
  },
  {
    src: 'https://goose.redgoose.me/data/upload/original/202408/koi.webp',
    thumbnail: 'https://goose.redgoose.me/data/upload/thumbnail/202408/66b8890ac4d5a.png',
    title: '황발화 활달바아아아',
    description: 'XOOooxoxoxo xoxoxoxxooo xxxx',
  },
  {
    src: 'https://goose.redgoose.me/data/upload/original/201906/2019-04-02_2-1.jpg',
    thumbnail: 'https://goose.redgoose.me/data/upload/original/201906/2019-04-02_2-1.jpg',
    title: 'ewtewrg dsgsdgsdg',
    description: 'XOOosdgsdg sdgds oxoxoxo xoxoxoxxooo xxxx',
  },
  {
    src: 'https://goose.redgoose.me/data/upload/original/201906/2019-03-11_2.jpg',
    thumbnail: 'https://goose.redgoose.me/data/upload/original/201906/2019-03-11_2.jpg',
    title: 'wefgegreg gmsdgmsd',
    description: '123123',
  },
  {
    src: 'https://goose.redgoose.me/data/upload/original/202106/rg-20181124-000290.jpg',
    thumbnail: 'https://goose.redgoose.me/data/upload/original/202106/rg-20181124-000290.jpg',
    title: '5675875687',
    description: '1231asdasd23',
  },
  {
    src: 'https://goose.redgoose.me/data/upload/original/202106/rg-20181115-000286.jpg',
    thumbnail: 'https://goose.redgoose.me/data/upload/original/202106/rg-20181124-000290.jpg',
    title: '5675875687',
    description: '1231asdasd23',
  },
  {
    src: 'https://goose.redgoose.me/data/upload/original/202106/rg-20181029-000279.jpg',
    thumbnail: 'https://goose.redgoose.me/data/upload/original/202106/rg-20181124-000290.jpg',
    title: '5675875687',
    description: '1231asdasd23',
  },
  {
    src: 'https://goose.redgoose.me/data/upload/original/202106/rg-20181008-000275.jpg',
    thumbnail: 'https://goose.redgoose.me/data/upload/original/202106/rg-20181124-000290.jpg',
    title: '5675875687',
    description: '1231asdasd23',
  },
]
