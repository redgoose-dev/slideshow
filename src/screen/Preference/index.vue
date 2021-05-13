<template>
<article class="preference" @click="onClose">
  <div class="preference__wrap" @click="e => { e.stopPropagation() }">
    <Side :mode="state.tab" @click-menu="onChangeTab"/>
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
      <div ref="content" class="preference__content">
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
import { defineComponent, defineAsyncComponent, reactive, computed, onMounted, onUnmounted, watch, ref } from 'vue';
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
    const preference = object.convertPureObject(store.state.preference);
    const slides = object.convertPureObject(store.state.slides);
    let state = reactive({
      tab: 'general', // general,slides,style,data,keyboard
      structure: {
        general: preference.general,
        slides: preference.slides,
        style: preference.style,
        data: {
          slides: JSON.stringify(slides, null, 2),
        },
        keyboard: preference.keyboard,
      },
      computedContentComponent: computed(() => {
        switch (state.tab)
        {
          case 'general':
          default:
            return defineAsyncComponent(() => import('./General'));
          case 'style':
            return defineAsyncComponent(() => import('./Style'));
          case 'slides':
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
    const content = ref(null);

    // methods
    function onChangeTab(name)
    {
      state.tab = name;
    }
    function onClose()
    {
      store.dispatch('changeMode', null);
    }
    function onUpdateFields(structure)
    {
      state.structure[state.tab] = structure;
    }
    function onSubmit(e)
    {
      e.preventDefault();
      if (!confirm('슬라이드쇼가 재시작됩니다.\n적용하시겠습니까?')) return;
      try
      {
        // check data
        let slides = JSON.parse(state.structure.data.slides);
        if (!object.checkSlideItems(slides)) throw 'The slides data is invalid.';
        let preference = {
          general: object.convertPureObject(state.structure.general),
          slides: object.convertPureObject(state.structure.slides),
          style: object.convertPureObject(state.structure.style),
          keyboard: object.convertPureObject(state.structure.keyboard),
        };
        if (!object.checkPreference(preference)) throw 'Bad preference data.';
        // update store
        store.dispatch('changeSlides', slides);
        store.dispatch('changePreference', preference);
        store.dispatch('changeMode', null);
        store.dispatch('changeActiveSlide', store.state.preference.slides.initialNumber);
        store.commit('updateUseKeyboardEvent', true);
        // restart
        local.main.restart();
      }
      catch(e)
      {
        alert('오류가 발생하여 적용하지 못했습니다.');
      }
    }

    // lifecycles
    onMounted(() => {
      if (local.slides) local.slides.pause(true);
    });
    onUnmounted(() => {
      if (local.slides) local.slides.pause(false);
    });

    // watch
    watch(() => state.tab, () => content.value.scrollTo(0, 0));

    return {
      state,
      content,
      onChangeTab,
      onSubmit,
      onClose,
      onUpdateFields,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
