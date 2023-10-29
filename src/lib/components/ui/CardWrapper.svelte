<script lang="ts">
  import Icon from "./Icon.svelte";
  export let title: string;
</script>

<div
  class="_card items-start gap-2 w-full h-full justify-between overflow-auto"
>
  <div class="flex gap-1 items-center">
    <Icon
      id="material-symbols-drag-indicator"
      class="w-4 h-4 inline-block text-green-500"
    />
    <p>{title}</p>
  </div>
  <slot />
</div>
