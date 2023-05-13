<script lang="ts">
  export let data;
</script>

<form method="POST">
  {#if data.alreadyAPlayer}
    <h1>Cześć, {data.playerData?.name}!</h1>
    <input name="name" type="hidden" value={data.playerData?.name} />
    ilu graczy? <input name="numberOfPlayers" type="number" />
  {:else}
    <h1>Cześć!</h1>
    jak sie nazywasz?<input name="name" type="text" />
    ilu graczy? <input name="numberOfPlayers" type="number" />
  {/if}
  <button>Rozpocznij nowa grę</button>
</form>
