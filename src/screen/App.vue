<template>
<LoadingIntro v-if="state.loading"/>
<Container v-else/>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue';
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
    async function refresh()
    {
      state.loading = true;
      // TODO: 임의로 3초 딜레이 시켰지만 합당한 딜레이 시간을 찾아야겠다.
      await util.sleep(3000);
      state.loading = false;
    }

    // watch
    // watch(() => store.state.preference.theme, updateTheme);

    // lifecycles
    onMounted(async () => {
      await util.sleep(500);
      // TODO: 스토리지에 들어있는 값들을 vuex 영역에 복원한다.
      // TODO: 아니면 서버에 있는 json 값들을 가져와 vuex 영역에 복원한다.
      state.loading = false;
    });

    return {
      state,
      refresh,
    };
  }
});
</script>
