<template>
<fieldset>
  <legend>information fields</legend>
  <div class="information">
    <figure>
      <img src="assets/information-light.png" alt="slideshow">
      <img src="assets/information-dark.png" alt="slideshow">
    </figure>
    <ul>
      <li>{{$t('preference.information.version')}}: <strong>{{version}}</strong></li>
      <li>GitHub: <a href="https://github.com/redgoose-dev/slideshow" target="_blank">https://github.com/redgoose-dev/slideshow</a></li>
      <li>{{$t('preference.information.author')}}: <a href="https://redgoose.me" target="_blank">https://redgoose.me</a></li>
    </ul>
    <p v-html="$t('preference.information.message1', { link: `<a href='https://github.com/redgoose-dev/slideshow/issues' target='_blank'>GitHub Issues</a>` })"/>
  </div>
</fieldset>
</template>

<script>
import { defineComponent } from 'vue';
import { version } from '~/../package.json';

export default defineComponent({
  name: 'PreferenceInformation',
  setup()
  {
    return {
      version,
    };
  },
});
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
@import "../../scss/mixins";
.information {
  > figure {
    margin: 20px 0;
    img {
      display: block;
      margin: 0 auto;
      max-width: 75%;
      zoom: .5;
      &:nth-child(2) {
        display: none;
      }
    }
  }
  > p {
    margin: 20px 0;
    font-size: 14px;
    line-height: 1.25;
  }
  > ul {
    margin: 20px 0;
    padding: 0;
    list-style: none;
    font-size: 14px;
    li {
      position: relative;
      padding: 0 0 0 20px;
      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 4px;
        top: 50%;
        width: 5px;
        height: 5px;
        background: var(--color-low-fill);
        transform: translateY(-50%);
        border-radius: 50%;
      }
    }
  }
  > * {
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  @include dark-mode() {
    > figure {
      img {
        &:nth-child(1) {
          display: none;
        }
        &:nth-child(2) {
          display: block;
        }
      }
    }
  }
}
</style>
