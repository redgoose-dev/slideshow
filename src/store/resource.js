// defaults
export const defaults = {
  preference: {
    general: {
      name: 'Slideshow',
      description: 'The slideshow description.',
      language: 'en', // en,ko
      hud: true,
      hoverVisibleHud: false,
      visibleHudContents: {
        menu: true,
        thumbnail: true,
        caption: true,
        controller: true,
        paginate: true,
        autoplay: true,
      },
    },
    slides: {
      initialNumber: 0,
      animationType: 'fade', // null,none,fade,horizontal
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
  },
  slides: [],
  mode: null,
  activeSlide: undefined,
  keyboardEvent: true,
};

// example slides
export const exampleSlides = [
  {
    src: "https://goose.redgoose.me/data/upload/original/201904/194e6128bed99cebc428116d3622908b.jpg",
    thumbnail: null,
    title: "small image",
    description: "작은 이미지용..."
  },
  {
    src: "https://goose.redgoose.me/data/upload/original/202010/matrix-001-002.jpg",
    thumbnail: null,
    title: "cureeent",
    description: "current description"
  },
  {
    src: "https://goose.redgoose.me/data/upload/original/202103/hud-tadpole-001.jpg",
    thumbnail: null,
    title: "preeev",
    description: "prevv sdmig sdigfs dmg\nsdmig sdgolp sdgm,"
  },
  {
    src: "https://goose.redgoose.me/data/upload/original/202003/double-generator-001.jpg",
    thumbnail: null,
    title: "neeext",
    description: "nexxtt description"
  },
  {
    src: "https://goose.redgoose.me/data/upload/original/202003/circle-body-001.jpg",
    thumbnail: null,
    title: "fioooo",
    description: "nexxtt description"
  },
  {
    src: "https://goose.redgoose.me/data/upload/original/202001/noise-color-001.jpg",
    thumbnail: null,
    title: "barrr",
    description: "nexxtt description"
  },
  {
    src: "https://goose.redgoose.me/data/upload/original/201909/2019-09-18_001.jpg",
    thumbnail: null,
    title: "choooo",
    description: "smdopgmspdg\nsd gjsdgp"
  },
  {
    src: "https://goose.redgoose.me/data/upload/original/202003/triangle-beeple-001.jpg",
    thumbnail: null,
    title: "하하보보 다다",
    description: "sdigg msdkgfp smdgp sdgiosdgi sdmg"
  },
  {
    src: "https://goose.redgoose.me/data/upload/original/201905/horizon-zero-dawn-1.jpg",
    thumbnail: null,
    title: "Horizon Zero Dawn",
    description: "ㅡ냐ㅐㅇㅎ너앻 ㅇㄴ헌ㅇ헤ㅔ"
  },
];
