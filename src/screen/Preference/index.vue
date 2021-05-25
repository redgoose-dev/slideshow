<template>
<article
  class="preference"
  @click="onClose"
  @touchstart="onTouchStart">
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
            :title="$t('base.apply')"
            @click="onSubmit">
            <Icon icon-name="check"/>
          </button>
          <button
            type="button"
            :title="$t('base.close')"
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
import { useI18n } from 'vue-i18n/index';
import { convertPureObject, checkPreference, checkTree } from '~/libs/object';
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
    const { t } = useI18n({ useScope: 'global' });
    const preference = convertPureObject(store.state.preference);
    const tree = convertPureObject(store.state.tree);
    let state = reactive({
      tab: 'data', // general,slides,style,data,keyboard,information
      structure: {
        general: preference.general,
        slides: preference.slides,
        style: preference.style,
        data: { tree },
        keyboard: preference.keyboard,
      },
      computedContentComponent: computed(() => {
        switch (state.tab)
        {
          case 'general':
          default:
            return defineAsyncComponent(() => import('./General'));
          case 'slides':
            if (!store.state.usePreference.slides) return;
            return defineAsyncComponent(() => import('./Slides'));
          case 'style':
            if (!store.state.usePreference.style) return;
            return defineAsyncComponent(() => import('./Style'));
          case 'data':
            if (!store.state.usePreference.data) return;
            return defineAsyncComponent(() => import('./Data'));
          case 'keyboard':
            if (!store.state.usePreference.keyboard) return;
            return defineAsyncComponent(() => import('./Keyboard'));
          case 'information':
            if (!store.state.usePreference.information) return;
            return defineAsyncComponent(() => import('./Information'));
        }
      }),
      computedHeaderContent: computed(() => {
        switch (state.tab)
        {
          case 'general':
          default:
            return {
              title: t('preference.header.general.title'),
              description: t('preference.header.general.description'),
            };
          case 'slides':
            return {
              title: t('preference.header.slides.title'),
              description: t('preference.header.slides.description'),
            }
          case 'style':
            return {
              title: t('preference.header.style.title'),
              description: t('preference.header.style.description'),
            };
          case 'data':
            return {
              title: t('preference.header.data.title'),
              description: t('preference.header.data.description'),
            };
          case 'keyboard':
            return {
              title: t('preference.header.keyboard.title'),
              description: t('preference.header.keyboard.description'),
            };
          case 'information':
            return {
              title: t('preference.header.information.title'),
              description: t('preference.header.information.description'),
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
    function onTouchStart(e)
    {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    }
    function onSubmit(e)
    {
      e.preventDefault();
      if (!confirm(t('preference.confirm'))) return;
      try
      {
        let tree = convertPureObject(state.structure.data.tree);
        checkTree(tree);
        let preference = {
          general: convertPureObject(state.structure.general),
          slides: convertPureObject(state.structure.slides),
          style: convertPureObject(state.structure.style),
          keyboard: convertPureObject(state.structure.keyboard),
        };
        if (!checkPreference(preference)) throw 'Bad preference data.';

        // update store
        store.dispatch('changePreference', preference);
        store.dispatch('changeMode', null);
        store.dispatch('changeActiveSlide', store.state.preference.slides.initialNumber);
        store.dispatch('changeAutoplay', false);
        store.commit('updateUseKeyboardEvent', true);
        store.dispatch('changeTree', tree);
        // check and update group
        if (!Object.keys(tree).filter(key => (key === store.state.group)).length)
        {
          store.dispatch('changeGroup', Object.keys(tree)[0]);
        }

        // restart
        local.main.restart().then();
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        alert(t('preference.failedApply'));
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
      onTouchStart,
      onUpdateFields,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
