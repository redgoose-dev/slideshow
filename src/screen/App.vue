<template>
<LoadingIntro v-if="state.loading"/>
<Container v-else/>
</template>

<script>
import { defineComponent, reactive, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
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
    let state = reactive({
      loading: true,
      dev: process.env.NODE_ENV === 'development',
    });

    // method
    function updateTheme()
    {
      // TODO: 다크모드 관련부분 작업
      console.log('update theme');
    }
    function start()
    {
      state.loading = false;
    }
    function stop()
    {
      state.loading = true;
    }
    async function restart()
    {
      stop();
      // TODO: 임의로 3초 딜레이 시켰지만 합당한 딜레이 시간을 찾아야겠다.
      await util.sleep(3000);
      start();
    }

    // watch
    // watch(() => store.state.preference, () => {
    //   console.log('updated preference');
    // });

    // lifecycles
    onMounted(async () => {
      await util.sleep(500);
      // TODO: 스토리지에 들어있는 값들을 vuex 영역에 복원한다.
      // TODO: 아니면 서버에 있는 json 값들을 가져와 vuex 영역에 복원한다.
      state.loading = false;
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
