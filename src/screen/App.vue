<template>
<LoadingIntro v-if="state.loading"/>
<Container v-else/>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n/index';
import * as util from '~/libs/util';
import * as storage from '~/libs/storage';
import Container from '~/screen/Container';
import LoadingIntro from '~/components/Loading/Intro';
import { convertPureObject } from "@/libs/object";

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
      loading: true,
      dev: process.env.NODE_ENV === 'development',
    });

    // method
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
    function start()
    {
      util.sleep(50).then(() => {
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
      util.sleep(1000).then(() => start());
    }

    // lifecycles
    onMounted(() => start());

    // get storage data
    const storagePreference = storage.get('preference');
    const storageSlides = storage.get('slides');
    if (storagePreference && storageSlides)
    {
      store.dispatch('changePreference', storagePreference);
      store.dispatch('changeSlides', storageSlides);
      store.dispatch('changeActiveSlide', storagePreference.slides.initialNumber);
    }
    else
    {
      storage.set('preference', convertPureObject(store.state.preference));
      storage.set('slides', convertPureObject(store.state.slides));
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
