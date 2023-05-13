<script lang="ts">
  export let numberOfPlayers: number;
  export let stage: number;

  const imageHeight = 200;

  $: highlightHeight = imageHeight / numberOfPlayers;
  $: topOffset = stage * highlightHeight;
</script>

<figure>
  <div class="highlighted-image">
    <img width={imageHeight} height={imageHeight} src="stickman.jpg" alt="Stickman" />
    <div class="higlighter" style:top={`${topOffset}px`} style:height={`${highlightHeight}px`} />
  </div>
  <figcaption>Te czesc rysujesz</figcaption>
</figure>

<style>
  .highlighted-image {
    position: relative;
    display: inline-block;
  }

  .higlighter {
    position: absolute;
    left: 0;
    background-color: black;
    width: 100%;
    opacity: 0.4;
  }
</style>
