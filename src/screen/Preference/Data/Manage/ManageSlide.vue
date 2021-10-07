<template>
<form @submit="onSubmit">
  <fieldset>
    <legend>Manage slide fields</legend>
    <div class="fields">
      <div class="field-basic">
        <h3 class="field-title">
          <label for="pref_src" class="required">{{$t('base.imageUrl')}}</label>
        </h3>
        <p class="field-description">
          {{$t('description.inputImageUrl')}}
        </p>
        <div class="field-multiple">
          <div class="field-multiple__body">
            <FormText
              ref="src"
              name="pref_src"
              id="pref_src"
              :placeholder="$t('base.inputUrl')"
              :required="false"
              v-model="state.form.src"/>
          </div>
          <nav>
            <ButtonBasic
              type="button"
              @click="onClickCheckUrl('src')">
              {{$t('base.openUrl')}}
            </ButtonBasic>
          </nav>
        </div>
      </div>
      <div class="field-basic">
        <h3 class="field-title">
          <label for="pref_thumbnail">
            {{$t('base.urlThumbnailUrl')}}
          </label>
        </h3>
        <p class="field-description">
          {{$t('description.inputThumbnailUrl')}}
        </p>
        <div class="field-multiple">
          <div class="field-multiple__body">
            <FormText
              ref="thumbnail"
              name="pref_thumbnail"
              id="pref_thumbnail"
              :placeholder="$t('base.inputUrl')"
              v-model="state.form.thumbnail"/>
          </div>
          <nav>
            <ButtonBasic
              type="button"
              @click="onClickCheckUrl('thumbnail')">
              {{$t('base.openUrl')}}
            </ButtonBasic>
          </nav>
        </div>
      </div>
      <div class="field-basic">
        <h3 class="field-title">
          <label for="pref_title">{{$t('base.subject')}}</label>
        </h3>
        <p class="field-description">
          {{$t('description.inputSlideTitle')}}
        </p>
        <div class="field-basic__body">
          <FormText
            name="pref_title"
            id="pref_title"
            :placeholder="$t('base.inputText')"
            v-model="state.form.title"/>
        </div>
      </div>
      <div class="field-basic">
        <h3 class="field-title">
          <label for="pref_description">{{$t('base.description')}}</label>
        </h3>
        <p class="field-description">
          {{$t('description.inputDescriptionSlide')}}
        </p>
        <div class="field-basic__body">
          <FormText
            name="pref_description"
            id="pref_description"
            :placeholder="$t('base.inputText')"
            v-model="state.form.description"/>
        </div>
      </div>
    </div>
    <nav class="submit-buttons">
      <div>
        <ButtonBasic type="submit" color="key" :inline="true">
          {{form.type === 'add' ? $t('base.add') : $t('base.submitEdit')}}
        </ButtonBasic>
      </div>
    </nav>
  </fieldset>
</form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import * as vueI18n from 'vue-i18n/index';
import FormText from '~/components/Form/Text';
import ButtonBasic from '~/components/Button/Basic';
import { validUrl } from '~/libs/string';

export default defineComponent({
  name: 'ManageSlide',
  components: {
    FormText,
    ButtonBasic,
  },
  props: {
    form: Object,
  },
  setup(props, context)
  {
    const { t } = vueI18n.useI18n({ useScope: 'global' });
    let state = reactive({
      form: props.form,
    });
    const src = ref(null);
    const thumbnail = ref(null);

    // methods
    function onClickCheckUrl(key)
    {
      const check = validUrl(state.form[key]);
      if (check)
      {
        window.open(state.form[key]);
      }
      else
      {
        alert(t('alert.invalidAddress'));
        switch (key)
        {
          case 'src':
            src.value.focus();
            break;
          case 'thumbnail':
            thumbnail.value.focus();
            break;
        }
      }
    }
    function onSubmit(e)
    {
      e.preventDefault();
      try
      {
        if (!(state.form.src && validUrl(state.form.src)))
        {
          src.value.focus();
          throw new Error('no image src address');
        }
        context.emit('submit', state.form);
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        alert(t('alert.errorSubmit'));
      }
    }

    return {
      state,
      src,
      thumbnail,
      onClickCheckUrl,
      onSubmit,
    };
  },
  emits: {
    'submit': null,
  },
});
</script>

<style src="../../fieldset.scss" lang="scss" scoped></style>
