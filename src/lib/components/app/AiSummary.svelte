<script lang="ts">
  import Tooltip from "../ui/Tooltip.svelte";

  export let text: string;
</script>

<div
  class="_card items-start gap-2 w-full h-full justify-between overflow-auto"
>
  <div class="flex justify-between items-center w-full">
    <p class="text-lg font-bold">Summary</p>
    <Tooltip
      message="Generated by AI - can be inaccurate"
      icon="material-symbols-warning-rounded"
    />
  </div>
  <p>
    {text}
  </p>
</div>
