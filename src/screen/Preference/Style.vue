<template>
<article>
  <p>style screen</p>
</article>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import * as object from '~/libs/object';
import FormText from '~/components/Form/Text';
import FormSelect from '~/components/Form/Select';
import FormSwitch from '~/components/Form/Switch';
import FormCheckbox from '~/components/Form/Checkbox';
import FormRadio from '~/components/Form/Radio';

export default defineComponent({
  name: 'PreferenceStyle',
  components: {
    FormText,
    FormSelect,
    FormSwitch,
    FormCheckbox,
    FormRadio,
  },
  props: {
    structure: Object,
  },
  setup(props, context)
  {
    let state = reactive({
      screenColor: props.structure.screenColor,
      imageScale: props.structure.imageScale,
      imageType: props.structure.imageType,
      captionScale: props.structure.captionScale,
      captionPosition: props.structure.captionPosition,
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
  emits: {
    'update': null,
  },
});
</script>

<style src="./fieldset.scss" lang="scss" scoped></style>
