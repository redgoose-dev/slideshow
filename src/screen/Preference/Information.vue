<template>
<fieldset>
  <legend>information fields</legend>
  <div class="information">
    <figure>
      <img src="assets/information-light.png" alt="slideshow">
      <img src="assets/information-dark.png" alt="slideshow">
    </figure>
    <ul>
      <li>{{$t('base.version')}}: <strong>{{version}}</strong></li>
      <li>GitHub: <a href="https://github.com/redgoose-dev/slideshow" target="_blank">https://github.com/redgoose-dev/slideshow</a></li>
      <li>{{$t('base.author')}}: <a href="https://redgoose.me" target="_blank">https://redgoose.me</a></li>
    </ul>
    <p v-html="$t('description.information', { link: `<a href='https://github.com/redgoose-dev/slideshow/issues' target='_blank'>GitHub Issues</a>` })"/>
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
<style src="./Information.scss" lang="scss" scoped></style>
