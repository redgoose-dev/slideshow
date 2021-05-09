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
    const store = useStore();
    const { t } = useI18n({ useScope: 'global' });
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
    async function start()
    {
      // TODO: delay
      await util.sleep(1000);
      // set color mode
      updateTheme(store.state.preference.style.screenColor);
      // TODO: 스토리지에 들어있는 값들을 vuex 영역에 복원한다.
      // TODO: 아니면 서버에 있는 json 값들을 가져와 vuex 영역에 복원한다.
      // off loading
      state.loading = false;
    }
    function stop()
    {
      state.loading = true;
    }
    function restart()
    {
      if (!confirm(t('main.confirmRestart'))) return;
      stop();
      nextTick().then(start);
    }

    // lifecycles
    onMounted(() => {
      start().then();
    });

    // watch
    watch(() => store.state.preference, () => {
      console.warn('update preference');
    });

    return {
      state,
      restart,
      start,
      stop,
    };
  }
});
</script>
