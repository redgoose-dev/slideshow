<template>
<article class="manage-tree">
  <section
    v-for="(item,k) in computes.index"
    class="tree-item">
    <header class="tree-item__header">
      <nav>
        <button
          type="button"
          title="toggle fold"
          :class="[
            'fold',
            state.fold[k] && 'fold--on',
          ]"
          @click="onToggleFold(k)">
          <Icon icon-name="arrow-down"/>
        </button>
      </nav>
      <h3>
        <strong><b>{{computes.keys[k]}}</b> {{item.name}} <em>{{item.slides.length}}</em></strong>
        <span v-if="item.description">{{item.description}}</span>
      </h3>
      <nav>
        <button
          type="button"
          title="Add slide"
          class="add"
          @click="onAddSlide(computes.keys[k])">
          <Icon icon-name="plus"/>
        </button>
        <button
          type="button"
          title="Edit tree item"
          class="edit"
          @click="onEditGroup(computes.keys[k])">
          <Icon icon-name="edit"/>
        </button>
        <button
          type="button"
          title="remove tree item"
          class="remove"
          @click="onRemoveGroup(computes.keys[k])">
          <Icon icon-name="x"/>
        </button>
      </nav>
    </header>
    <Slides
      v-if="state.fold[k]"
      :item-key="computes.keys[k]"
      :items="item.slides"
      @update="o => onUpdateSlides(computes.keys[k], o)"
      @edit="n => onEditSlide(computes.keys[k], n)"
      @remove="n => onRemoveSlide(computes.keys[k], n)"/>
    <nav class="tree-item__add">
      <button type="button">add slide</button>
    </nav>
  </section>
  <nav class="add-tree">
    <ButtonBasic
      title="Add group"
      color="key"
      @click="onAddGroup">
      Add group
    </ButtonBasic>
  </nav>

  <teleport to="#modal">
    <ModalWrapper
      v-if="state.showManageGroup"
      title="Edit tree item"
      class="modal-edit-form"
      @close="state.showManageGroup = false">
      <ManageGroup
        :form="state.manageFormGroup"
        @submit="onSubmitGroup"/>
    </ModalWrapper>
    <ModalWrapper
      v-if="state.showEditSlide"
      title="Edit slide"
      class="modal-edit-form"
      @close="state.showEditSlide = false">
      <EditSlide
        :form="state.editFormSlide"
        @update="onUpdateSlide"/>
    </ModalWrapper>
  </teleport>
</article>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { convertPureObject } from '~/libs/object';
import Icon from '~/components/Icon';
import ButtonBasic from '~/components/Button/Basic';
import ModalWrapper from '~/screen/Preference/Data/ModalWrapper';
import Slides from './Slides';
import ManageGroup from './ManageGroup';
import EditSlide from './EditSlide';

export default defineComponent({
  name: 'PreferenceDataManage',
  components: {
    Icon,
    ButtonBasic,
    ModalWrapper,
    Slides,
    ManageGroup,
    EditSlide,
  },
  props: {
    tree: { type: Object, required: true },
  },
  setup(props, context)
  {
    let state = reactive({
      fold: new Array(Object.keys(props.tree).length).fill(false),
      dragPlaceholder: undefined,
      showManageGroup: false,
      showEditSlide: false,
      manageFormGroup: undefined,
      editFormSlide: undefined,
    });
    let computes = reactive({
      index: computed(() => {
        const keys = Object.keys(props.tree);
        return keys.map(key => (props.tree[key]));
      }),
      keys: computed(() => (Object.keys(props.tree))),
    });

    // methods
    function onUpdateSlides(key, newSlides)
    {
      let clone = convertPureObject(props.tree);
      clone[key].slides = newSlides;
      context.emit('update', clone);
    }
    function onToggleFold(key)
    {
      state.fold[key] = !state.fold[key];
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
      if (!confirm('정말 삭제할까요?')) return;
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
            if (!newKey) throw new Error('유효한 키가 아닙니다.');
            clone[newKey] = {
              ...clone[originalKey],
              name,
              description,
            };
            delete clone[originalKey];
            break;
        }
        context.emit('update', clone);
        state.showManageGroup = false;
      }
      catch(e)
      {
        console.error(e.message)
      }
    }
    function onAddSlide()
    {
      //
    }
    function onEditSlide(key, n)
    {
      state.editFormSlide = {
        key,
        src: '',
        thumbnail: '',
        title: '',
        description: '',
      };
      state.showEditSlide = true;
    }
    function onRemoveSlide(key, n)
    {
      console.log('onRemoveSlide');
    }
    function onUpdateSlide()
    {
      console.log('onUpdateSlide');
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
      onUpdateSlide,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.modal-edit-form {
  --modal-size-height: 560px;
}
</style>
