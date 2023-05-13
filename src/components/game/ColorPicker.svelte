<script lang="ts">
  import ColorBox from './ColorBox.svelte';
  import colors, { type Color } from './colors';

  export let currentColor: Color;
</script>

<section>
  {#each colors as color}
    <ColorBox {color} on:change-color={(event) => (currentColor = event.detail.color)} />
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(14, 1em);
  }
</style>
