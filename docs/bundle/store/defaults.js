"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  preference: {
    general: {
      language: 'en',
      // en,ko
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
        group: true
      }
    },
    slides: {
      initialNumber: 0,
      animationType: 'horizontal',
      // none,fade,horizontal
      animationSpeed: 500,
      captionAnimationType: 'none',
      // none,shuffle
      captionAnimationSpeed: 40,
      autoplay: false,
      autoplayDelay: 7000,
      autoplayDirection: true,
      // next(true), prev(false)
      autoplayPauseOnHover: false,
      loop: true,
      swipe: true
    },
    style: {
      screenColor: 'system',
      // dark,light,system
      imageType: 'none',
      // none,contain,cover
      imageScale: ['75%', '75%'],
      // [ width, height ]
      captionScale: 100,
      // %
      captionPosition: ['32px', '30px'] // [ left, top ]

    },
    keyboard: {
      enabled: true
    }
  },
  usePreference: {
    slides: true,
    style: true,
    data: true,
    keyboard: true,
    information: true
  },
  tree: {
    default: {
      slides: []
    }
  },
  slides: [],
  group: 'default',
  mode: null,
  activeSlide: undefined,
  keyboardEvent: true,
  autoplay: false
};
exports.default = _default;