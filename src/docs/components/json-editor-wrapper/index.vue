<template>
<div ref="$editor"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import JsonEditor from '@redgoose/json-editor'
import '@redgoose/json-editor/css'

const $editor = ref()
const props = defineProps({
  modelValue: { type: [ Object, Array ], default: {} },
  live: { type: Boolean, default: false },
  theme: { type: String, default: 'system' },
  openDepth: { type: Number, default: 2 },
  edit: { type: String, default: 'all' }, // all,value,none
})
const emits = defineEmits([ 'init', 'context', 'update:modelValue' ])
let editor

onMounted(() => {
  editor = new JsonEditor($editor.value, {
    live: props.live,
    theme: props.theme,
    edit: props.edit,
  })
  $editor.value.addEventListener('update', onUpdateEditor)
  $editor.value.addEventListener('context', onContextEditor)
  editor.replace(props.modelValue, {
    openDepth: props.openDepth,
  }, false)
  emits('init', editor)
})
onBeforeUnmount(() => {
  $editor.value.removeEventListener('update', onUpdateEditor)
  $editor.value.removeEventListener('context', onContextEditor)
  editor.destroy()
  $editor.value.innerHTML = ''
})

defineExpose({
  core: () => { return editor },
  // change
})

watch(() => props.live, value => {
  editor.options.live = value
})
watch(() => props.theme, value => {
  editor.options.theme = value
})

function onUpdateEditor(e)
{
  emits('update:modelValue', e?.detail)
}
function onContextEditor(e)
{
  emits('context', e?.detail)
}

function change(src)
{
  emits('update:modelValue', src)
  editor.replace(src, {}, true)
}
</script>

<style lang="scss" scoped>
div {
  --json-editor-switch-ball-active: var(--docs-color-weak);
}
</style>