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
    index: [],
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
};

// actions
const actions = {
  // 컨텐츠 모드변경
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
};

export default createStore({
  state,
  mutations,
  actions,
});
