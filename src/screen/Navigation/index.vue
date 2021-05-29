<template>
<nav
  class="slideshow-navigation"
  @touchstart="onTouchStart"
  @click="onClickWrapper">
  <div
    v-if="computes.visibleAutoplay"
    class="slideshow-navigation__item">
    <button
      type="button"
      :title="$t('base.autoplay')"
      :class="$store.state.autoplay ? 'active' : ''"
      @click="onClickAutoplayButton">
      <Icon icon-name="play-circle"/>
    </button>
  </div>
  <div
    v-if="computes.visibleGroup"
    class="slideshow-navigation__item">
    <button
      type="button"
      :title="$t('base.group')"
      @click="onClickGroup">
      <Icon icon-name="folder" class="folder"/>
    </button>
  </div>
  <div
    v-if="$store.state.preference.general.visibleHudContents.menu"
    class="slideshow-navigation__item">
    <button
      type="button"
      :title="$t('base.menu')"
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
            {{$t('base.preference')}}
          </button>
        </li>
        <li v-if="computes.visibleThumbnail">
          <button
            type="button"
            @click="onClickContextItem('thumbnail')">
            {{$t('title.thumbnailView')}}
          </button>
        </li>
        <li>
          <button
            type="button"
            :class="[ state.activeFullscreen && 'on' ]"
            @click="onClickContextItem('fullscreen')">
            {{$t('base.fullscreen')}}
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
    });
    let computes = reactive({
      visibleThumbnail: computed(() => {
        return store.state.slides && store.state.slides.length > 1;
      }),
      visibleAutoplay: computed(() => {
        const { slides, preference } = store.state;
        if (!preference.slides.autoplay) return false;
        return slides && slides.length > 0;
      }),
      visibleGroup: computed(() => {
        return store.state.tree && Object.keys(store.state.tree).length > 1;
      }),
    });

    // private methods
    function onClickAutoplayButton()
    {
      if (local.slides) local.slides.autoplay();
    }
    function onClickMenuButton(e)
    {
      if (e) e.stopPropagation();
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
      switchActiveMenu(false);
      switch (key)
      {
        case 'preference':
          store.dispatch('changeMode', 'preference');
          break;
        case 'thumbnail':
          store.dispatch('changeMode', 'thumbnail');
          break;
        case 'fullscreen':
          util.fullscreen(!state.activeFullscreen);
          state.activeFullscreen = !state.activeFullscreen;
          break;
      }
    }
    function onTouchStart(e)
    {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    }
    function onClickWrapper(e)
    {
      e.stopPropagation();
    }
    function onClickGroup()
    {
      store.dispatch('changeMode', 'group');
    }

    // public methods
    function blur()
    {
      switchActiveMenu(false);
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
      computes,
      onClickAutoplayButton,
      onClickMenuButton,
      onClickContextItem,
      onTouchStart,
      onClickWrapper,
      onClickGroup,
      blur,
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
