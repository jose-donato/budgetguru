<script lang="ts">
  import { createTooltip, melt } from "@melt-ui/svelte";
  import { fade } from "svelte/transition";
  import Icon from "./Icon.svelte";

  export let message: string;
  export let icon: string;

  const {
    elements: { trigger, content, arrow },
    states: { open },
  } = createTooltip({
    positioning: {
      placement: "top",
    },
    openDelay: 0,
    closeDelay: 0,
    closeOnPointerDown: false,
    forceVisible: true,
  });
</script>

<button type="button" class="trigger" use:melt={$trigger} aria-label="Add">
  <Icon class="w-4 h-4" id={icon} />
</button>

{#if $open}
  <div
    use:melt={$content}
    transition:fade={{ duration: 100 }}
    class="z-10 rounded-lg bg-zinc-800 shadow"
  >
    <div use:melt={$arrow} />
    <p class="px-4 py-1 text-white">
      {message}
    </p>
  </div>
{/if}

<style lang="postcss">
  .trigger {
    @apply inline-flex h-9 w-9 items-center justify-center rounded bg-zinc-800;
    @apply text-primary transition-colors hover:bg-zinc-700;
    @apply focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset-2;
    @apply p-0 text-sm font-medium;
  }
</style>
