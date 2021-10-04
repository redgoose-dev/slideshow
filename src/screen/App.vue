<template>
<LoadingIntro v-if="state.loading"/>
<Container v-else :error="state.error"/>
</template>

<script>
import { defineComponent, reactive, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n/index';
import * as storage from '../libs/storage';
import * as local from '../libs/local';
import { getApiData, sleep, initCustomEvent } from '../libs/util';
import { convertPureObject, checkPreference, checkSlideItems } from '../libs/object';
import Container from './Container.vue';
import LoadingIntro from '../components/Loading/Intro.vue';

// set dev
if (window) window.dev = process.env.NODE_ENV === 'development';

// set baseOptions
let baseOptions = {
  preference: undefined,
  tree: [],
};

export default defineComponent({
  name: 'App',
  components: {
    Container,
    LoadingIntro,
  },
  props: {
    preference: Object,
    group: String,
    tree: [ Object, Array ],
  },
  /**
   * initialize slideshow
   * */
  initialize(options)
  {
    const { tree, preference } = options;
    if (preference) baseOptions.preference = preference;
    if (tree) baseOptions.tree = convertPureObject(tree);
  },
  setup(props, context)
  {
    let root = ref(null);
    let store = useStore();
    const { t, locale } = useI18n({ useScope: 'global' });
    let state = reactive({
      dev: process.env.NODE_ENV === 'development',
      loading: true,
      error: undefined,
    });
    let restarting = false;

    // private methods
    function updateTheme(color)
    {
      let theme;
      switch(color)
      {
        case 'light':
        case 'dark':
          theme = color;
          break;
        default:
          theme = 'system';
          break;
      }
      const $html = document.querySelector('html');
      $html.dataset['color'] = theme;
    }
    function error(sw)
    {
      if (sw)
      {
        state.error = {
          title: 'Error slides',
          description: '슬라이드를 가져오는데 오류가 발생했습니다.',
        }
      }
      else
      {
        state.error = undefined;
      }
    }
    function fetchPreference()
    {
      if (props.preference)
      {
        storage.disabled('preference');
        if (checkPreference(props.preference))
        {
          let preference = convertPureObject(props.preference);
          store.dispatch('changePreference', preference);
          store.dispatch('changeActiveSlide', preference.slides.initialNumber);
        }
      }
      else
      {
        const storagePreference = storage.get('preference') || baseOptions.preference;
        if (storagePreference && checkPreference(storagePreference))
        {
          store.dispatch('changePreference', storagePreference);
          store.dispatch('changeActiveSlide', storagePreference.slides.initialNumber);
        }
        else
        {
          storage.set('preference', convertPureObject(store.state.preference));
        }
      }
    }
    function fetchGroup()
    {
      let group;
      if (props.group)
      {
        storage.disabled('group');
        group = props.group;
      }
      else
      {
        let storageGroup = storage.get('group');
        group = storageGroup || 'default';
      }
      store.dispatch('changeGroup', group);
    }
    function fetchTree()
    {
      try
      {
        let tree;
        if (props.tree)
        {
          storage.disabled('tree');
          tree = props.tree;
        }
        else
        {
          const storageSlides = storage.get('tree');
          tree = !!storageSlides ? storageSlides : baseOptions.tree;
        }
        if (Array.isArray(tree))
        {
          tree = {
            default: { slides: tree },
          };
        }
        store.dispatch('changeTree', tree);
        error(false);
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        error(true);
      }
    }
    async function fetchSlides()
    {
      try
      {
        const { group, tree } = store.state;
        let slides = tree[group] ? tree[group].slides : [];
        if (slides && typeof slides === 'string')
        {
          let getSlides = await getApiData(slides);
          checkSlideItems(getSlides);
          slides = getSlides;
        }
        else if (!(slides && Array.isArray(slides)))
        {
          slides = null;
        }
        store.dispatch('changeSlides', slides);
        error(false);
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        store.dispatch('changeSlides', null);
        error(true);
      }
    }
    // public methods
    function start()
    {
      sleep(60).then(() => {
        state.loading = false;
      });
    }
    function stop()
    {
      state.loading = true;
    }
    async function restart()
    {
      if (restarting) return;
      restarting = true;
      stop();
      updateTheme(store.state.preference.style.screenColor);
      locale.value = store.state.preference.general.language;
      await fetchSlides();
      await sleep(800);
      start();
      restarting = false;
    }
    function update(type)
    {
      switch (type)
      {
        case 'preference':
          context.emit('update-preference', convertPureObject(store.state.preference));
          break;
        case 'tree':
          context.emit('update-tree', convertPureObject(store.state.tree));
          break;
        case 'group':
          context.emit('update-group', store.state.group);
          break;
      }
    }

    // lifecycles
    onMounted(async () => {
      fetchTree();
      fetchGroup();
      await fetchSlides();
      start();
    });

    // watch
    watch(() => props.preference, () => {
      fetchPreference();
      restart().then();
    });
    watch(() => props.tree, () => {
      fetchTree();
      restart().then();
    });
    watch(() => props.group, () => {
      fetchGroup();
      restart().then();
    });

    // actions
    initCustomEvent();
    fetchPreference();
    updateTheme(store.state.preference.style.screenColor);
    locale.value = store.state.preference.general.language;

    return {
      root,
      state,
      start,
      stop,
      restart,
      update,
    };
  },
  mounted()
  {
    local.setup(this, {
      preference: !!this.preference,
      tree: !!this.tree,
      group: !!this.group,
    });
  },
  emits: {
    'update-preference': null,
    'update-tree': null,
    'update-group': null,
  },
});
</script>
