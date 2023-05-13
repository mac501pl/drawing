<script lang="ts">
  import type { Color } from './colors';
  import type { Game } from '../../lib/model/api';
  import Canvas from './Canvas.svelte';
  import ColorPicker from './ColorPicker.svelte';
  import colors from './colors';
  import StageVisualizer from './StageVisualizer.svelte';
  import FinishButton from './FinishButton.svelte';

  export let gameData: Game;

  let dataUrl: string;
  let currentColor: Color = colors[0];
  let previousStageDataUrl = gameData.stages[gameData.players.length - 1];
  let isLast = gameData.stages.length + 1 === gameData.numberOfPlayers;
</script>

<main>
  <StageVisualizer numberOfPlayers={gameData.numberOfPlayers} stage={gameData.stages?.length} />
  <Canvas {currentColor} {previousStageDataUrl} {isLast} bind:dataUrl />
  <ColorPicker bind:currentColor />
  <FinishButton bind:dataUrl />
</main>
