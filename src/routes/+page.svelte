<div class="service">
  <Slideshow
    preference={{
      general: {
        hud: false,
        FOOO: 'BARRR',
      },
    }}
    tree={[]}/>
</div>

<script>
import { onMount } from 'svelte'
import { Slideshow } from '$lib/index.js'

let root

onMount(() => {
  //
})
</script>

<style>
:global(html) {
  overflow: hidden;
}
:global(body) {
  margin: 0;
}

.service {
  width: 100dvw;
  max-width: 100%;
  height: 100dvh;
  box-sizing: border-box;
}
</style>
