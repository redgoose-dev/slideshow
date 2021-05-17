<template>
<LoadingIntro v-if="state.loading"/>
<Container v-else/>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n/index';
import * as storage from '~/libs/storage';
import { convertPureObject } from '~/libs/object';
import { sleep, initCustomEvent } from '~/libs/util';
import example from '~/example.json';
import Container from '~/screen/Container';
import LoadingIntro from '~/components/Loading/Intro';

export default defineComponent({
  name: 'App',
  components: {
    Container,
    LoadingIntro,
  },
  setup()
  {
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
    // set slides data
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

    // actions
    updateTheme(store.state.preference.style.screenColor);
    locale.value = store.state.preference.general.language;

    return {
      state,
      start,
      stop,
      restart,
    };
  }
});
</script>
