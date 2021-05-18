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
import { convertPureObject, checkPreference, checkSlideItems } from '~/libs/object';
import { sleep, initCustomEvent } from '~/libs/util';
import Container from '~/screen/Container';
import LoadingIntro from '~/components/Loading/Intro';
import example from '~/example.json';

export default defineComponent({
  name: 'App',
  components: {
    Container,
    LoadingIntro,
  },
  props: {
    preference: Object,
    slides: Array,
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
    // public methods
    function start()
    {
      sleep(50).then(() => {
        state.loading = false;
      });
    }
    function stop()
    {
      state.loading = true;
    }
    function restart()
    {
      stop();
      updateTheme(store.state.preference.style.screenColor);
      locale.value = store.state.preference.general.language;
      sleep(1000).then(() => start());
    }

    // lifecycles
    onMounted(() => start());

    // initial custom event
    initCustomEvent();

    // set preference data
    if (props.preference)
    {
      storage.disabled();
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
      if (storagePreference)
      {
        store.dispatch('changePreference', storagePreference);
        store.dispatch('changeActiveSlide', storagePreference.slides.initialNumber);
      }
      else
      {
        storage.set('preference', convertPureObject(store.state.preference));
      }
    }

    // set slides data
    if (props.slides)
    {
      storage.disabled();
      if (checkSlideItems(props.slides))
      {
        let slides = convertPureObject(props.slides);
        store.dispatch('changeSlides', slides);
        storage.set('slides', slides);
      }
    }
    else
    {
      const storageSlides = storage.get('slides');
      if (storageSlides)
      {
        store.dispatch('changeSlides', storageSlides);
      }
      else
      {
        const slides = example;
        store.dispatch('changeSlides', slides);
        storage.set('slides', slides);
      }
    }

    // actions
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
