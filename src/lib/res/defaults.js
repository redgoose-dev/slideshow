
/** @var {object} preference */
export const preference = {
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

/** @var {object[]} tree */
export const tree = [
  {
    src: 'https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=70',
    thumbnail: 'https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70',
    title: 'Sunset over the mountains of Skye',
    description: 'Published on October 21, 2016',
  },
  {
    src: 'https://images.unsplash.com/photo-1580996378027-23040f16f157?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=70',
    thumbnail: 'https://images.unsplash.com/photo-1580996378027-23040f16f157?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70',
    title: 'Reflet de la ville sur l\'eau Amsterdam',
    description: 'Published on February 6, 2020',
  },
]
