<script lang="ts">
  import Game from '../../components/game/Game.svelte';
  import GameSummary from '../../components/game/GameSummary.svelte';

  export let data;
  export let form;
</script>

<pre>{JSON.stringify(data.game, null, 2)}</pre>

{#if data.gameSummary}
  <GameSummary gameSummary={data.gameSummary} />
{:else if data.canPlay}
  <div>Do dzieła, {data.player.name}!</div>
  <Game gameData={data.game} />
{:else}
  <p>{data.message}</p>
{/if}

{#if form?.success}
  <p>Super! Podziel się linkiem ze znajomymi, aby mogli dokończyć obrazek</p>
{/if}
