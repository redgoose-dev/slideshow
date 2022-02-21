<template>
<fieldset>
  <legend>information fields</legend>
  <div class="information">
    <figure>
      <img :src="signatures.light" alt="slideshow">
      <img :src="signatures.dark" alt="slideshow">
    </figure>
    <ul>
      <li>{{t('base.version')}}: <strong>{{version}}</strong></li>
      <li>GitHub: <a href="https://github.com/redgoose-dev/slideshow" target="_blank">https://github.com/redgoose-dev/slideshow</a></li>
      <li>{{t('base.author')}}: <a href="https://redgoose.me" target="_blank">https://redgoose.me</a></li>
    </ul>
    <p v-html="t('description.information', { link: `<a href='https://github.com/redgoose-dev/slideshow/issues' target='_blank'>GitHub Issues</a>` })"/>
  </div>
</fieldset>
</template>

<script setup>
import i18n from '../../i18n';
import pkg from '../../../package.json';

const name = 'PreferenceInformation';
const { t } = i18n.global;
const version = pkg.version;
const signatures = {
  light: 'https://raw.githubusercontent.com/redgoose-dev/slideshow/main/resource/github/signature-light.png',
  dark: 'https://raw.githubusercontent.com/redgoose-dev/slideshow/main/resource/github/signature-dark.png',
};
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
<style src="./Information.scss" lang="scss" scoped></style>
