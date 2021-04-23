import { createStore } from 'vuex';

// state
const state = {
  preference: {
    general: {},
    style: {},
    slide: {},
    keyboard: {
      enableShortcut: true,
    },
  },
  slides: {
    index: [
      {
        src: 'https://goose.redgoose.me/data/upload/original/202010/matrix-001-002.jpg',
        title: 'cureeent',
        description: 'current description',
      },
      {
        src: 'https://goose.redgoose.me/data/upload/original/202103/hud-tadpole-001.jpg',
        title: 'preeev',
        description: 'prevv description',
      },
      {
        src: 'https://goose.redgoose.me/data/upload/original/202003/double-generator-001.jpg',
        title: 'neeext',
        description: 'nexxtt description',
      },
      {
        src: 'https://goose.redgoose.me/data/upload/original/202003/circle-body-001.jpg',
        title: 'fioooo',
        description: 'nexxtt description',
      },
      {
        src: 'https://goose.redgoose.me/data/upload/original/202001/noise-color-001.jpg',
        title: 'barrr',
        description: 'nexxtt description',
      },
      {
        src: 'https://goose.redgoose.me/data/upload/original/201909/2019-09-18_001.jpg',
        title: 'choooo',
        description: 'smdopgmspdg\nsd gjsdgp',
      },
    ],
    active: 0,
  },
  mode: null, // null,thumbnail,preference
  dev: process.env.NODE_ENV === 'development',
};

// mutations
const mutations = {
  changeMode(state, value)
  {
    state.mode = value;
  },
  changeSlideActive(state, value)
  {
    let infinite = true; // TODO: 옵션에서 인피니트 플레이가 `true`라면 마지막에서 0으로 돌아가고 아니면 멈춘다.
    if (state.slides.index.length - 1 < value)
    {
      if (!infinite) return;
      state.slides.active = 0;
    }
    else if (value < 0)
    {
      if (!infinite) return;
      state.slides.active = state.slides.index.length - 1;
    }
    else
    {
      state.slides.active = Number(value);
    }
  },
  updatePreference(state, value)
  {
    // TODO
  }
};

// actions
const actions = {
  /**
   * change mode
   * 컨텐츠 모드변경
   */
  changeMode(context, value)
  {
    let mode = null;
    switch (value)
    {
      case 'thumbnail':
      case 'preference':
        mode = value;
        break;
    }
    context.commit('changeMode', mode);
  },
  /**
   * update preference
   */
  updatePreference(context, newValue)
  {
    // TODO
  }
};

export default createStore({
  state,
  mutations,
  actions,
});
