<script lang="ts">
  export let id: string;
</script>

<svg {...$$props}>
  <use href={`/icons/sprite.svg#${id}`} />
</svg>
