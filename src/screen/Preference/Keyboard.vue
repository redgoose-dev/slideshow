<template>
<fieldset>
  <legend>Keyboard fields</legend>
  <div class="fields">
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_enabled">Enabled shortcut</label>
        </h3>
        <p class="field-description">
          키보드 단축키를 사용합니다.
        </p>
      </div>
      <div class="field-switch__input">
        <FormSwitch
          name="pref_enabled"
          id="pref_enabled"
          v-model="state.enabled"
          @update:modelValue="onSave"/>
      </div>
    </div>
    <hr class="field-line">
  </div>

  <section class="keyboard-guide">
    <header class="keyboard-guide__header">
      <h3>Keyboard guide</h3>
      <p>다름과 같이 키보드 단축키를 누르면 해당 기능이 작동됩니다.</p>
    </header>
    <table class="keyboard-guide__body">
      <thead>
      <tr>
        <th>Shortcut key</th>
        <td>Description</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th><code>Left</code></th>
        <td>이전 슬라이드로 이동</td>
      </tr>
      <tr>
        <th><code>Right</code></th>
        <td>다음 슬라이드로 이동</td>
      </tr>
      <tr>
        <th><code>A</code></th>
        <td>자동재생</td>
      </tr>
      <tr>
        <th><code>S</code></th>
        <td>환경설정</td>
      </tr>
      <tr>
        <th><code>T</code></th>
        <td>썸네일 이미지 목록화면</td>
      </tr>
      <tr>
        <th><code>R</code></th>
        <td>슬라이드 재실행</td>
      </tr>
      <tr>
        <th><code>H</code></th>
        <td>모든 HUD 요소 보이기</td>
      </tr>
      </tbody>
    </table>
  </section>
</fieldset>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import * as object from '~/libs/object';
import FormSwitch from '~/components/Form/Switch';

export default defineComponent({
  name: 'PreferenceKeyboard',
  components: {
    FormSwitch,
  },
  props: {
    structure: Object,
  },
  setup(props, context)
  {
    let state = reactive({
      enabled: props.structure.enabled,
    });

    // methods
    function onSave()
    {
      const structure = object.convertPureObject(state);
      context.emit('update', structure);
    }

    return {
      state,
      onSave,
    };
  },
});
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
<style src="./Keyboard.scss" lang="scss" scoped></style>
