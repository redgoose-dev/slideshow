export default {
  preference: {
    general: {
      name: 'Slideshow',
      description: 'The slideshow description.',
      language: 'en', // en,ko
      hud: true,
      hoverVisibleHud: false,
      clickVisibleHud: false,
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
  },
  usePreference: {
    slides: true,
    style: true,
    data: true,
    keyboard: true,
    information: true,
  },
  slides: [],
  mode: null,
  activeSlide: undefined,
  keyboardEvent: true,
};
