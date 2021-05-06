<template>
<article class="preference">
  <div class="preference__wrap">
    <Side
      :mode="state.tab"
      class="preference__side"
      @click-menu="onChangeTab"/>
    <form class="preference__body" @submit="onSubmit">
      <header class="preference-header">
        <div class="preference-header__body">
          <h2>{{state.computedHeaderContent.title}}</h2>
          <p>{{state.computedHeaderContent.description}}</p>
        </div>
        <nav class="preference-header__nav">
          <button
            type="submit"
            title="Submit"
            @click="onSubmit">
            <Icon icon-name="check"/>
          </button>
          <button
            type="button"
            title="Close"
            @click="onClose">
            <Icon icon-name="x"/>
          </button>
        </nav>
      </header>
      <div class="preference__content">
        <component
          :is="state.computedContentComponent"
          :structure="state.structure[state.tab]"
          @update="onUpdateFields"/>
      </div>
    </form>
  </div>
</article>
</template>

<script>
import { defineComponent, defineAsyncComponent, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import * as object from '~/libs/object';
import * as local from '~/libs/local';
import Icon from '~/components/Icon';
import Side from './Side';

export default defineComponent({
  name: 'preference',
  components: {
    Icon,
    Side,
  },
  setup()
  {
    const store = useStore();
    let state = reactive({
      tab: 'general', // general,style,slide,data,keyboard
      structure: object.convertPureObject(store.state.preference),
      computedContentComponent: computed(() => {
        switch (state.tab)
        {
          case 'general':
          default:
            return defineAsyncComponent(() => import('./General'));
          case 'style':
            return defineAsyncComponent(() => import('./Style'));
          case 'slide':
            return defineAsyncComponent(() => import('./Slide'));
          case 'data':
            return defineAsyncComponent(() => import('./Data'));
          case 'keyboard':
            return defineAsyncComponent(() => import('./Keyboard'));
        }
      }),
      computedHeaderContent: computed(() => {
        switch (state.tab)
        {
          case 'general':
          default:
            return {
              title: 'General',
              description: '기초적인 항목들을 설정합니다.',
            };
          case 'style':
            return {
              title: 'Style',
              description: '화면에 표시되는 부분들을 설정합니다.',
            };
          case 'slide':
            return {
              title: 'Slide',
              description: '슬라이드와 관련된 부분들을 설정합니다.',
            }
          case 'data':
            return {
              title: 'Data',
              description: '슬라이드 데이터를 관리합니다.',
            };
          case 'keyboard':
            return {
              title: 'Keyboard',
              description: '키보드 단축키에 관한 설정입니다.',
            };
        }
      }),
    });

    // methods
    function onChangeTab(name)
    {
      state.tab = name;
    }
    function onSubmit(e)
    {
      e.preventDefault();
      console.log('onSubmit');
    }
    function onClose()
    {
      store.commit('changeMode', null);
    }
    function onUpdateFields(structure)
    {
      console.log(state.structure[state.tab], structure);
    }

    // lifecycles
    onMounted(() => {
      if (local.slides) local.slides.pause(true);
      store.commit('useKeyboardEvent', false);
    });
    onUnmounted(() => {
      if (local.slides) local.slides.pause(false);
      store.commit('useKeyboardEvent', true);
    });

    return {
      state,
      onChangeTab,
      onSubmit,
      onClose,
      onUpdateFields,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
