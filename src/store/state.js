export default {
  preference: {
    general: {
      name: 'Slideshow',
      description: 'slideshow description',
      language: 'en', // en,ko
      hud: true,
      hoverVisibleHud: false,
      visibleHudContents: {
        menu: true,
        thumbnail: true,
        caption: true,
        controller: true,
        paginate: true,
      },
    },
    style: {
      screenColor: 'light', // dark,light,system
      imageScale: ['85%','85%'], // [ width, height ]
      imageType: null, // null,contain,cover
      captionScale: 100, // %
      captionPosition: ['32px','30px'], // [ left, top ]
    },
    slides: {
      initialNumber: 0,
      animationType: 'horizontal', // null,none,fade,horizontal
      animationSpeed: 500,
      animationCaptionType: 'none', // none,shuffle
      animationCaptionSpeed: 40,
      autoplay: false,
      autoplayDelay: 3000,
      autoplayDirection: true, // next(true), prev(false)
      autoplayPauseOnHover: false,
      loop: true,
      swipe: true,
    },
    keyboard: {
      enable: true,
    },
  },
  slides: [
    {
      src: 'https://goose.redgoose.me/data/upload/original/201904/194e6128bed99cebc428116d3622908b.jpg',
      thumbnail: null,
      title: 'small image',
      description: '작은 이미지용...',
    },
    {
      src: 'https://goose.redgoose.me/data/upload/original/202010/matrix-001-002.jpg',
      thumbnail: null,
      title: 'cureeent',
      description: 'current description',
    },
    {
      src: 'https://goose.redgoose.me/data/upload/original/202103/hud-tadpole-001.jpg',
      thumbnail: null,
      title: 'preeev',
      description: 'prevv sdmig sdigfs dmg\nsdmig sdgolp sdgm,',
    },
    {
      src: 'https://goose.redgoose.me/data/upload/original/202003/double-generator-001.jpg',
      thumbnail: null,
      title: 'neeext',
      description: 'nexxtt description',
    },
    {
      src: 'https://goose.redgoose.me/data/upload/original/202003/circle-body-001.jpg',
      thumbnail: null,
      title: 'fioooo',
      description: 'nexxtt description',
    },
    {
      src: 'https://goose.redgoose.me/data/upload/original/202001/noise-color-001.jpg',
      thumbnail: null,
      title: 'barrr',
      description: 'nexxtt description',
    },
    {
      src: 'https://goose.redgoose.me/data/upload/original/201909/2019-09-18_001.jpg',
      thumbnail: null,
      title: 'choooo',
      description: 'smdopgmspdg\nsd gjsdgp',
    },
    {
      src: 'https://goose.redgoose.me/data/upload/original/202003/triangle-beeple-001.jpg',
      thumbnail: null,
      title: '하하보보 다다',
      description: 'sdigg msdkgfp smdgp sdgiosdgi sdmg',
    },
    {
      src: 'https://goose.redgoose.me/data/upload/original/201905/horizon-zero-dawn-1.jpg',
      thumbnail: null,
      title: 'Horizon Zero Dawn',
      description: 'ㅡ냐ㅐㅇㅎ너앻 ㅇㄴ헌ㅇ헤ㅔ',
    },
  ],
  mode: 'preference', // null,thumbnail,preference
  activeSlide: undefined,
  keyboardEvent: true,
  dev: process.env.NODE_ENV === 'development', // TODO: 사용하지 않으면 삭제할 수 있다.
};
