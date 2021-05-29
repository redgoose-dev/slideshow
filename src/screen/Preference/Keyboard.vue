<template>
<fieldset>
  <legend>Keyboard fields</legend>
  <div class="fields">
    <div class="field-switch">
      <div class="field-switch__body">
        <h3 class="field-title">
          <label for="pref_enabled">
            {{$t('title.usingKeyboard')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('description.usingKeyboard')}}
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
      <h3>
        {{$t('base.guide')}}
      </h3>
      <p>
        {{$t('description.keyboardGuide')}}
      </p>
    </header>
    <table class="keyboard-guide__body">
      <thead>
      <tr>
        <th>
          {{$t('base.ShortcutKey')}}
        </th>
        <td>
          {{$t('base.description')}}
        </td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>
          <code>
            {{$t('base.leftKey')}}
          </code>
        </th>
        <td>
          {{$t('label.prevSlide')}}
        </td>
      </tr>
      <tr>
        <th>
          <code>
            {{$t('base.rightKey')}}
          </code>
        </th>
        <td>
          {{$t('label.nextSlide')}}
        </td>
      </tr>
      <tr>
        <th><code>A</code></th>
        <td>
          {{$t('base.autoplay')}}
        </td>
      </tr>
      <tr>
        <th><code>S</code></th>
        <td>
          {{$t('description.openPreference')}}
        </td>
      </tr>
      <tr>
        <th><code>T</code></th>
        <td>
          {{$t('description.thumbnail')}}
        </td>
      </tr>
      <tr>
        <th><code>R</code></th>
        <td>
          {{$t('description.restart')}}
        </td>
      </tr>
      <tr>
        <th><code>H</code></th>
        <td>
          {{$t('description.hud')}}
        </td>
      </tr>
      <tr>
        <th><code>G</code></th>
        <td>
          {{$t('description.group')}}
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</fieldset>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { convertPureObject } from '~/libs/object';
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
      const structure = convertPureObject(state);
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
