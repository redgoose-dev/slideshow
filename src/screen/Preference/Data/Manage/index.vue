<template>
<article class="manage-tree">
  <section v-for="(item,k) in computes.index" class="tree-item">
    <header class="tree-item__header">
      <nav>
        <button
          type="button"
          :title="$t('title.fold')"
          :class="[ 'fold', state.fold[item.key] && 'fold--on' ]"
          @click="onToggleFold(item.key)">
          <Icon icon-name="arrow-down"/>
        </button>
      </nav>
      <h3>
        <strong>
          <b>{{item.key}}</b> {{item.name}} <em>{{item.slides.length}}</em>
        </strong>
        <span v-if="item.description">
          {{item.description}}
        </span>
      </h3>
      <nav>
        <button
          type="button"
          :title="$t('label.addSlide')"
          class="add"
          @click="onAddSlide(item.key)">
          <Icon icon-name="plus"/>
        </button>
        <button
          type="button"
          :title="$t('label.editGroup')"
          class="edit"
          @click="onEditGroup(item.key)">
          <Icon icon-name="edit"/>
        </button>
        <button
          type="button"
          :title="$t('label.removeGroup')"
          class="remove"
          @click="onRemoveGroup(item.key)">
          <Icon icon-name="x"/>
        </button>
      </nav>
    </header>
    <Slides
      v-if="state.fold[item.key]"
      :item-key="item.key"
      :items="item.slides"
      @change-order="o => onUpdateSlides(item.key, o)"
      @edit="n => onEditSlide(item.key, n)"
      @remove="n => onRemoveSlide(item.key, n)"/>
  </section>
  <nav class="add-tree">
    <ButtonBasic
      :title="$t('label.addGroup')"
      color="key"
      @click="onAddGroup">
      {{$t('label.addGroup')}}
    </ButtonBasic>
  </nav>
  <teleport to="#modal">
    <ModalWrapper
      v-if="state.showManageGroup"
      :title="$t('label.editGroup')"
      class="modal-edit-group"
      @close="state.showManageGroup = false">
      <ManageGroup
        :form="state.manageFormGroup"
        @submit="onSubmitGroup"/>
    </ModalWrapper>
    <ModalWrapper
      v-if="state.showManageSlide"
      :title="$t('label.editSlide')"
      class="modal-edit-slide"
      @close="state.showManageSlide = false">
      <ManageSlide
        :form="state.editFormSlide"
        @submit="onSubmitSlide"/>
    </ModalWrapper>
  </teleport>
</article>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n/index';
import { convertPureObject } from '~/libs/object';
import Icon from '~/components/Icon';
import ButtonBasic from '~/components/Button/Basic';
import ModalWrapper from '~/screen/Preference/Data/ModalWrapper';
import Slides from './Slides';
import ManageGroup from './ManageGroup';
import ManageSlide from './ManageSlide';

export default defineComponent({
  name: 'PreferenceDataManage',
  components: {
    Icon,
    ButtonBasic,
    ModalWrapper,
    Slides,
    ManageGroup,
    ManageSlide,
  },
  props: {
    tree: { type: Object, required: true },
  },
  setup(props, context)
  {
    const { t } = useI18n({ useScope: 'global' });
    let state = reactive({
      fold: createFold(),
      dragPlaceholder: undefined,
      showManageGroup: false,
      showManageSlide: false,
      manageFormGroup: undefined,
      editFormSlide: undefined,
    });
    let computes = reactive({
      index: computed(() => {
        const keys = Object.keys(props.tree);
        return keys.map(key => ({
          ...props.tree[key],
          key,
        }));
      }),
    });

    // methods
    function createFold()
    {
      let obj = {};
      Object.keys(props.tree).forEach(key => {
        obj[key] = false;
      });
      return obj;
    }
    function onUpdateSlides(key, newSlides)
    {
      let clone = convertPureObject(props.tree);
      clone[key].slides = newSlides;
      context.emit('update', clone);
    }
    function onToggleFold(key, sw = undefined)
    {
      state.fold[key] = sw === undefined ? !state.fold[key] : sw;
    }
    function onAddGroup()
    {
      state.manageFormGroup = {
        type: 'add',
        key: '',
        name: '',
        description: '',
      };
      state.showManageGroup = true;
    }
    function onEditGroup(key)
    {
      state.manageFormGroup = {
        type: 'edit',
        key: key,
        originalKey: key,
        name: props.tree[key].name,
        description: props.tree[key].description,
      };
      state.showManageGroup = true;
    }
    function onRemoveGroup(key)
    {
      if (!confirm(t('confirm.remove'))) return;
      let clone = convertPureObject(props.tree);
      delete clone[key];
      context.emit('update', clone);
    }
    function onSubmitGroup(res)
    {
      try
      {
        const { key, originalKey, type, name, description } = res;
        let newKey;
        let clone = convertPureObject(props.tree);
        function testKey(str)
        {
          if (!/^[a-zA-Z0-9_]+$/.test(str)) throw new Error('Error key');
          if (props.tree[str]) throw new Error('The value exists.');
          return key;
        }
        switch (type)
        {
          case 'add':
            newKey = testKey(key);
            clone[newKey] = {
              name,
              description,
              slides: [],
            };
            break;
          case 'edit':
            newKey = (originalKey !== key) ? testKey(key) : key;
            if (!newKey) throw new Error('Not a valid key.');
            clone[newKey] = {
              ...clone[originalKey],
              name,
              description,
            };
            if (originalKey !== key) delete clone[originalKey];
            break;
        }
        context.emit('update', clone);
        state.showManageGroup = false;
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        alert(t('alert.errorSubmit'));
      }
    }
    function onAddSlide(key)
    {
      state.editFormSlide = {
        type: 'add',
        groupKey: key,
        src: 'https://',
        thumbnail: '',
        title: '',
        description: '',
      };
      state.showManageSlide = true;
    }
    function onEditSlide(key, n)
    {
      const item = props.tree[key].slides[n];
      state.editFormSlide = {
        type: 'edit',
        groupKey: key,
        key: n,
        src: item.src,
        thumbnail: item.thumbnail,
        title: item.title,
        description: item.description,
      };
      state.showManageSlide = true;
    }
    function onRemoveSlide(key, n)
    {
      if (!confirm(t('confirm.remove'))) return;
      let clone = convertPureObject(props.tree);
      clone[key].slides.splice(n, 1);
      context.emit('update', clone);
    }
    function onSubmitSlide(res)
    {
      const { type, groupKey, key, src, thumbnail, title, description } = res;
      let clone = convertPureObject(props.tree);
      try
      {
        const obj = {
          src,
          thumbnail,
          title,
          description,
        };
        switch (type)
        {
          case 'add':
            clone[groupKey].slides.push(obj);
            break;
          case 'edit':
            clone[groupKey].slides[key] = obj;
            break;
        }
        onToggleFold(groupKey, true);
        context.emit('update', clone);
        state.showManageSlide = false;
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        alert(t('alert.errorSubmit'));
      }
    }

    return {
      state,
      computes,
      onUpdateSlides,
      onToggleFold,
      onAddGroup,
      onEditGroup,
      onRemoveGroup,
      onSubmitGroup,
      onAddSlide,
      onEditSlide,
      onRemoveSlide,
      onSubmitSlide,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.modal-edit-group {
  --modal-size-height: 560px;
}
.modal-edit-slide {
  --modal-size-height: 690px;
}
</style>
