<template>
<nav class="slideshow-navigation">
  <div
    v-if="state.computedVisibleThumbnail"
    class="slideshow-navigation__item">
    <button
      type="button"
      :title="$t('navigation.thumbnail')"
      :class="state.computedActiveThumbnail ? 'on' : ''"
      @click="onClickThumbnailButton(!state.computedActiveThumbnail)">
      <Icon icon-name="grid"/>
    </button>
  </div>
  <div
    v-if="$store.state.preference.general.visibleHudContents.menu"
    class="slideshow-navigation__item">
    <button
      type="button"
      :title="$t('navigation.menu')"
      :class="state.activeMenu ? 'on' : ''"
      @click="onClickMenuButton">
      <Icon icon-name="menu"/>
    </button>
    <div
      :class="[
        'slideshow-navigation-context',
        state.activeMenu && 'slideshow-navigation-context--on',
      ]">
      <ul>
        <li>
          <button
            type="button"
            @click="onClickContextItem('preference')">
            {{$t('navigation.preference')}}
          </button>
        </li>
        <li v-if="$store.state.slides.length > 0">
          <button
            type="button"
            :class="[ $store.state.preference.slides.autoplay && 'on' ]"
            @click="onClickContextItem('autoplay')">
            {{$t('navigation.autoplay')}}
          </button>
        </li>
        <li>
          <button
            type="button"
            :class="[ state.activeFullscreen && 'on' ]"
            @click="onClickContextItem('fullscreen')">
            {{$t('navigation.fullscreen')}}
          </button>
        </li>
        <li>
          <button
            type="button"
            :class="[ state.activeFullscreen && 'on' ]"
            @click="onClickContextItem('guide')">
            {{$t('navigation.guide')}}
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { defineComponent, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import * as local from '~/libs/local';
import * as util from '~/libs/util';
import Icon from '~/components/Icon';

export default defineComponent({
  name: 'Navigation',
  components: {
    Icon,
  },
  setup()
  {
    const store = useStore();
    let state = reactive({
      activeMenu: false,
      activeFullscreen: false,
      computedVisibleThumbnail: computed(() => {
        if (!store.state.preference.general.visibleHudContents.thumbnail) return false;
        return store.state.slides && store.state.slides.length > 0;
      }),
      computedActiveThumbnail: computed(() => {
        return store.state.mode === 'thumbnail';
      }),
    });

    // methods
    function onClickThumbnailButton(sw)
    {
      store.dispatch('changeMode', sw ? 'thumbnail' : null);
    }
    function onClickMenuButton(e)
    {
      e.stopPropagation();
      if (state.activeMenu)
      {
        switchActiveMenu(false);
      }
      else
      {
        window.on('click.navigationMenu', () => switchActiveMenu(false));
        switchActiveMenu(true);
      }
    }
    function switchActiveMenu(sw)
    {
      state.activeMenu = sw;
      if (!sw) window.off('click.navigationMenu');
    }
    function onClickContextItem(key)
    {
      switch (key)
      {
        case 'preference':
          store.dispatch('changeMode', 'preference');
          break;
        case 'autoplay':
          if (local.slides) local.slides.autoplay();
          break;
        case 'fullscreen':
          util.fullscreen(!state.activeFullscreen);
          state.activeFullscreen = !state.activeFullscreen;
          break;
        case 'guide':
          store.dispatch('changeMode', 'guide');
          break;
      }
    }

    // lifecycles
    onMounted(() => {
      document.on('fullscreenchange.slideshow', () => {
        state.activeFullscreen = !!document.fullscreenElement;
      });
    });
    onUnmounted(() => {
      document.off('fullscreenchange.slideshow');
    });

    return {
      state,
      onClickThumbnailButton,
      onClickMenuButton,
      onClickContextItem,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
