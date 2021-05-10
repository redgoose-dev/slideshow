<template>
<LoadingIntro v-if="state.loading"/>
<Container v-else/>
</template>

<script>
import { defineComponent, reactive, watch, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n/index';
import * as util from '~/libs/util';
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
      util.sleep(1000).then(() => {
        state.loading = false;
      });
    }
    function stop()
    {
      state.loading = true;
    }
    function restart()
    {
      state.loading = true;
      util.sleep(100).then(() => {
        updateTheme(store.state.preference.style.screenColor);
        state.loading = false;
      });
    }

    // lifecycles
    onMounted(() => {
      updateTheme(store.state.preference.style.screenColor);
      start();
    });

    // watch
    watch(() => store.state.preference, () => {
      console.warn('update preference');
    });

    return {
      state,
      start,
      stop,
      restart,
    };
  }
});
</script>
