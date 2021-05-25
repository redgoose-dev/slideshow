<template>
<LoadingIntro v-if="state.loading"/>
<Container v-else/>
</template>

<script>
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n/index';
import * as storage from '~/libs/storage';
import * as local from '~/libs/local';
import { getApiData } from '~/libs/util';
import { convertPureObject, checkPreference, checkSlideItems } from '~/libs/object';
import { sleep, initCustomEvent } from '~/libs/util';
import Container from '~/screen/Container';
import LoadingIntro from '~/components/Loading/Intro';

// set dev
if (window) window.dev = process.env.NODE_ENV === 'development';

export default defineComponent({
  name: 'App',
  components: {
    Container,
    LoadingIntro,
  },
  props: {
    preference: Object,
    group: String,
    tree: Object,
  },
  setup(props)
  {
    let root = ref(null);
    let store = useStore();
    const { t, locale } = useI18n({ useScope: 'global' });
    let state = reactive({
      dev: process.env.NODE_ENV === 'development',
      loading: true,
    });

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
          storage.set('preference', preference);
        }
      }
      else
      {
        const storagePreference = storage.get('preference');
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
      let group = props.group ? props.group : storage.get('group');
      store.dispatch('changeGroup', group);
    }
    async function fetchTree()
    {
      let tree, slides;

      try
      {
        // set tree
        if (props.tree)
        {
          storage.disabled('tree');
          tree = props.tree;
        }
        else
        {
          const storageSlides = storage.get('tree');
          tree = !!storageSlides ? storageSlides : convertPureObject(require('~/example.json'));
        }
        if (Array.isArray(tree))
        {
          tree = {
            default: {
              slides: tree,
            },
          };
        }
        store.dispatch('changeTree', tree);

        // set slides
        slides = store.state.tree[store.state.group] ? store.state.tree[store.state.group].slides : [];
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
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        alert('error slide data');
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
    async function restart(reloadSlides = false)
    {
      stop();
      updateTheme(store.state.preference.style.screenColor);
      locale.value = store.state.preference.general.language;
      await fetchTree();
      await sleep(800);
      if (reloadSlides)
      {
        fetchTree().then(() => start());
      }
      else
      {
        start();
      }
    }

    // lifecycles
    onMounted(() => {
      fetchTree().then(() => start());
    });

    // actions
    initCustomEvent();
    fetchPreference();
    fetchGroup();
    updateTheme(store.state.preference.style.screenColor);
    locale.value = store.state.preference.general.language;

    return {
      root,
      state,
      start,
      stop,
      restart,
    };
  },
  mounted()
  {
    local.setup(this);
  },
});
</script>
