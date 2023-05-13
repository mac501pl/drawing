<script lang="ts">
  import { onMount } from 'svelte';
  import type { Color } from './colors';

  export let currentColor: Color;
  export let dataUrl: string;
  export let previousStageDataUrl: string;
  export let isLast: boolean;

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let isMouseDown = false;

  const canvasHeight = 300;
  const canvasWidth = 600;
  const hintHeight = 40;

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    ctx.lineCap = 'round';
  });

  function getMousePosition(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function mousedown(event: MouseEvent) {
    isMouseDown = true;
    const currentPosition = getMousePosition(event);
    ctx.moveTo(currentPosition.x, currentPosition.y);
    ctx.beginPath();
  }

  function mousemove(event: MouseEvent) {
    if (isMouseDown) {
      const currentPosition = getMousePosition(event);
      ctx.lineTo(currentPosition.x, currentPosition.y);
      ctx.stroke();
    }
  }

  function mouseup() {
    isMouseDown = false;
    dataUrl = canvas.toDataURL();
  }

  $: if (ctx) ctx.strokeStyle = currentColor;
</script>

<section>
  {#if previousStageDataUrl}
    <div class="crop-container" style:height={`${hintHeight}px`} style:width={`${canvasWidth}px`}>
      <img src={previousStageDataUrl} width={`${canvasWidth}px`} alt="Końcówka poprzedniego rysunku" />
      <div class="higlighter" style:height={`${hintHeight}px`} />
    </div>
  {/if}
  <div class="overlay" style:height={`${canvasHeight}px`} style:width={`${canvasWidth}px`}>
    <canvas height={`${canvasHeight}px`} width={`${canvasWidth}px`} bind:this={canvas} on:mousedown={mousedown} on:mousemove={mousemove} on:mouseup={mouseup} />
    {#if !isLast}
      <div class="higlighter" style:height={`${hintHeight}px`} />
    {/if}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
  }

  .crop-container {
    overflow: hidden;
    background-color: black;
    opacity: 0.4;
    position: relative;
    user-select: none;
  }

  .crop-container::after {
    content: '<- dolna część obrazka poprzedniej osoby';
    position: absolute;
    right: -100px;
  }

  img {
    position: absolute;
    bottom: 0;
  }

  .overlay {
    position: relative;
  }

  canvas {
    top: 0;
    left: 0;
    position: absolute;
    display: inline-block;
    z-index: 3;
  }

  .higlighter {
    position: absolute;
    bottom: 0px;
    background-color: black;
    width: 100%;
    opacity: 0.4;
    z-index: 1;
  }

  .higlighter::after {
    content: '<- ta część będzie widoczna przez następną osobę';
    position: absolute;
    right: -100px;
  }
</style>
