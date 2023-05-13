<script lang="ts">
  import type { Game, Player } from '$lib/model/api';

  export let gameSummary: { gameData: Game; playerData: Player[] };
</script>

<h1>Obrazek użytkowników</h1>
<ul>
  {#each gameSummary.playerData as player}
    <li>{player.name}</li>
  {/each}
</ul>

<img src={gameSummary.gameData.finalImage} alt="Skończony obrazek" />
<a href={gameSummary.gameData.finalImage} download>Zapisz obrazek</a>
