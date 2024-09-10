<div class="slideshow">
  {#await asyncInit}
    <Loading/>
  {:then res}
    <Container/>
  {:catch error}
    <Error/>
  {/await}
</div>

<script>
import { createEventDispatcher, onMount, onDestroy } from 'svelte'
import { preference as storePreference, tree as storeTree } from '../store/index.js'
import Container from './container.svelte'
import Loading from './loading.svelte'
import Error from './error.svelte'

export let preference = undefined
export let tree = undefined

const dispatch = createEventDispatcher() // update-preference, update-tree
let asyncInit = init()
let mounted = false

$: updatePreference(preference)
$: updateTree(tree)

// lifecycles
onMount(() => {
  mounted = true
})
onDestroy(() => {})

/**
 * 슬라이드쇼 초기화
 */
async function init()
{
  // setup preference
  storePreference.setup(preference)
  // console.log('$storePreference', $storePreference)
  // setup tree
  storeTree.setup(tree)
  // console.log('$storeTree', $storeTree)
}

/**
 * update preference
 * 마운트 이후에 preference props 값 업데이트
 * @param {object} src
 */
function updatePreference(src)
{
  if (!mounted) return
  try
  {
    //
  }
  catch (e)
  {
    //
  }
}

/**
 * update tree
 * 마운트 이후에 tree props 값 업데이트
 * @param {object[]} src
 */
function updateTree(src)
{
  if (!mounted) return
  try
  {
    // console.log('updateTree', src)
    // TODO: 값 검사하기
    // TODO: 값 스토어에 업데이트하기
  }
  catch (e)
  {
    //
  }
}
</script>

<style lang="scss">
@use '../libs/mixins';
@import url('https://assets.redgoose.me/fonts/index.css');
.slideshow {
  // color
  --color-bg: hsl(0 0% 98%);
  --color-fill: hsl(0 0% 9%);
  --color-low-fill: hsl(0 0% 28%);
  --color-key: hsl(148 88% 38%);
  --color-shape: hsl(0 0% 88%);
  --color-shape-button: hsl(0 0% 56%);
  --color-invert: hsl(0 0% 100%);
  --color-danger: hsl(4 80% 44%);
  // size
  --size-shape-radius: 2px;
  // font
  --font-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  --font-eng: Helvetica, Arial, sans-serif;
  // speed
  --speed-button-active: 200ms;
  --speed-slide-animation: 1000ms;
  --speed-content-toggle: 300ms;

  // element
  min-width: 320px;
  width: 100%;
  height: 100%;
  background: var(--color-bg);
  -webkit-touch-callout: none;
  overflow: hidden;
  font-family: var(--font-base);
  color: var(--color-text);
  &, button, input, textarea, select {
    font-size: 1rem;
    line-height: 1.62;
    -webkit-text-size-adjust: none;
  }
  a {
    color: var(--color-key);
  }
  :global(::selection) {
    background: var(--color-key);
    color: var(--color-invert);
  }

  // mixins
  //@include mixins.dark-mode-root() {
  //  color-scheme: dark;
  //  --color-text-hsl: 0 0% 85%;
  //  --color-edge-hsl: 0 0% 98%;
  //  --color-bg-hsl: 0 0% 13%;
  //  --color-text-blur-hsl: 0 0% 47%;
  //  --color-key-hsl: 142 76% 46%;
  //  --color-sub-hsl: 45 100% 60%;
  //}
  //@include mixins.responsive(tablet) {
  //  --size-side-padding: 58px;
  //  --size-header-height: 54px;
  //}
}
</style>
