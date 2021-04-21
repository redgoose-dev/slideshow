<template>
<div class="slideshow">
  <LoadingIntro v-if="state.loading"/>
  <Container v-else/>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import * as util from '~/libs/util';
import Container from '~/screen/Container/index.vue';
import LoadingIntro from '~/components/Loading/Intro.vue';

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
    };
  }
});
</script>

<style lang="scss">
.slideshow {}
</style>
