<template>
<nav class="slideshow-navigation">
  <div class="slideshow-navigation__item">
    <button
      type="button"
      :title="$t('navigation.thumbnail')"
      :class="state.activeThumbnail ? 'on' : ''"
      @click="onClickThumbnailButton">
      <Icon icon-name="grid"/>
    </button>
  </div>
  <div class="slideshow-navigation__item">
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
        <li>
          <button
            type="button"
            :class="[ false && 'on' ]"
            @click="onClickContextItem('autoplay')">
            {{$t('navigation.autoplay')}}
          </button>
        </li>
        <li>
          <button
            type="button"
            @click="onClickContextItem('fullscreen')">
            {{$t('navigation.fullscreen')}}
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import Icon from '~/components/Icon/index.vue';

export default defineComponent({
  name: 'Navigation',
  components: {
    Icon,
  },
  setup()
  {
    const store = useStore();
    let state = reactive({
      activeThumbnail: false,
      activeMenu: false,
    });

    // methods
    function onClickThumbnailButton(): void
    {
      state.activeThumbnail = !state.activeThumbnail;
      store.dispatch('changeMode', !state.activeThumbnail ? null : 'thumbnail');
    }
    function onClickMenuButton(e: PointerEvent): void
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
    function switchActiveMenu(sw: boolean): void
    {
      state.activeMenu = sw;
      if (!sw) window.off('click.navigationMenu');
    }
    function onClickContextItem(key: string): void
    {
      switch (key)
      {
        case 'preference':
          console.log('on click preference in context menu item');
          break;
        case 'autoplay':
          console.log('on click autoplay in context menu item');
          break;
        case 'fullscreen':
          console.log('on click fullscreen in context menu item');
          break;
      }
    }

    return {
      state,
      onClickThumbnailButton,
      onClickMenuButton,
      onClickContextItem,
    };
  },
});
</script>

<style src="./index.scss" lang="scss"></style>
