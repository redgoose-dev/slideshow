/** @var {object} defaultPreference */
export const defaultPreference = {
  general: {
    language: 'en', // en,ko
      hud: true,
      hoverVisibleHud: false,
      clickVisibleHud: false,
      visibleHudContents: {
      menu: true,
        thumbnail: false,
        caption: true,
        controller: true,
        paginate: true,
        autoplay: true,
        group: true,
    },
  },
  slides: {
    initialNumber: 0,
      animationType: 'horizontal', // none,fade,horizontal
      animationSpeed: 500,
      captionAnimationType: 'none', // none,shuffle
      captionAnimationSpeed: 40,
      autoplay: false,
      autoplayDelay: 7000,
      autoplayDirection: true, // next(true), prev(false)
      autoplayPauseOnHover: false,
      loop: true,
      swipe: true,
  },
  style: {
    screenColor: 'system', // dark,light,system
    imageType: 'none', // none,contain,cover
    imageScale: ['75%','75%'], // [ width, height ]
    captionScale: 100, // %
    captionPosition: ['32px','30px'], // [ left, top ]
  },
  keyboard: {
    enabled: true,
  },
}

/** @var {object[]} defaultSlides */
export const defaultSlides = [
  {
    key: 'key-000',
    src: 'https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=70',
    thumbnail: 'https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70',
    title: 'Sunset over the mountains of Skye',
    description: 'Published on October 21, 2016',
  },
  {
    key: 'key-001',
    src: 'https://goose.redgoose.me/data/upload/original/202407/baguni-001.webp',
    thumbnail: 'https://goose.redgoose.me/data/upload/original/202407/baguni-001.webp',
    title: '바구니 (Baguni)',
    description: '나 다른 파일들을 보관과 탐색을 목적으로 하는 툴을 만들자는 아이디어를 여러 번 작성해왔다. 어쩌면 FUI 리소스를 보관하거나 생성하는 툴을 만드려다가 먼저 보관하는 부분을 먼저 만들어야겠다는 필요성을 느꼈던..',
  },
  {
    key: 'key-002',
    src: 'https://images.unsplash.com/photo-1580996378027-23040f16f157?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=70',
    thumbnail: 'https://images.unsplash.com/photo-1580996378027-23040f16f157?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70',
    title: 'Reflet de la ville sur l\'eau Amsterdam',
    description: 'Published on February 6, 2020',
  },
  {
    key: 'key-003',
    src: 'https://goose.redgoose.me/data/upload/original/202408/koi.webp',
    thumbnail: 'https://goose.redgoose.me/data/upload/thumbnail/202408/66b8890ac4d5a.png',
    title: 'fFOFOOFOoofoof',
    description: 'XOOooxoxoxo xoxoxoxxooo xxxx',
  },
]
