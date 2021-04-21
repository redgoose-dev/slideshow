<template>
<nav class="slideshow-navigation">
  <div class="slideshow-navigation__item">
    <button
      type="button"
      :class="state.activeThumbnail ? 'on' : ''"
      @click="onClickThumbnailButton">
      <Icon icon-name="grid"/>
    </button>
  </div>
  <div class="slideshow-navigation__item">
    <button
      type="button"
      :class="state.activeMenu ? 'on' : ''"
      @click="onClickMenuButton">
      <Icon icon-name="menu"/>
    </button>
    <div class="slideshow-navigation-context">
      <ul>
        <li>item</li>
        <li>item</li>
        <li>item</li>
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
    function onClickThumbnailButton()
    {
      state.activeThumbnail = !state.activeThumbnail;
      store.dispatch('changeMode', !state.activeThumbnail ? null : 'thumbnail');
    }
    function onClickMenuButton()
    {
      console.log('menu');
    }
    function onClickContextItem()
    {
      console.log('onClickContextItem');
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

<style lang="scss">
.slideshow-navigation {
  display: flex;
  &__item {
    &:nth-child(n+2) {
      margin-left: 1px;
    }
    > button {
      display: block;
      width: 48px;
      height: 48px;
      padding: 0;
      margin: 0;
      background: hsla(0, 0%, 0%, .4);
      border: none;
      font-size: 0;
      border-radius: 0;
      outline: none;
      cursor: pointer;
      transition: background-color 200ms ease-out;
      &:active {
        background-color: hsla(0, 0%, 0%, .7);
      }
      &.on {
        background-color: hsla(0, 0%, 0%, .7);
      }
      > svg {
        display: block;
        margin: 0 auto;
        --icon-color: var(--color-invert);
        --icon-stroke: 1.5;
        --icon-size: 22px;
      }
    }
  }
}
.slideshow-navigation-context {
  position: relative;
  > ul {
    position: absolute;
    right: 0;
    top: 0;
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
