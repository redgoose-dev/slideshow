import defaults from './defaults';

let state = defaults;

// TODO: assign test values - start
state.slides = [
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
];
state.mode = null; // null,thumbnail,preference,guide
state.activeSlide = undefined;
state.keyboardEvent = true;
state.preference.style.screenColor = 'system';
// TODO: assign test values - end

export default state;
