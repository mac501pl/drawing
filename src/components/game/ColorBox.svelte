<script lang="ts">
  import type { Color } from './colors';
  import { createEventDispatcher } from 'svelte';
  export let color: Color;

  const dispatch = createEventDispatcher();

  function changeColor() {
    dispatch('change-color', { color });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div style:background-color={color} on:click={changeColor} />

<style>
  div {
    width: 1em;
    height: 1em;

    border: 1px black solid;
  }
</style>
