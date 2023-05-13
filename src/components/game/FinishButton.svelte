<script lang="ts">
  export let dataUrl: string;
</script>

<form method="POST" action="?/finish">
  <input type="hidden" name="dataUrl" value={dataUrl} />
  <button>Zakończ rysować</button>
</form>
